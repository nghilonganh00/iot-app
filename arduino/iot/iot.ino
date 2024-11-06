#ifdef ESP8266
#include <ESP8266WiFi.h>
#else
#include <WiFi.h>
#endif

#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHTPIN D5  
#define DHTTYPE DHT11 

#define LDR_PIN A0  

const int led1 = 4; 
const int led2 = 0; 
const int led3 = 2; 
const int led4 = 12;

const char* ssid = "Nha 17 - P602";
const char* password = "66668888";

// MQTT Broker Connection Details
const char* mqtt_server = "192.168.162.102";
const char* mqtt_username = "LeVanThien1";
const char* mqtt_password = "123";
const int mqtt_port = 1993;

// Create instances
WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);

// Connect to WiFi
void setup_wifi() {
  Serial.print("\nConnecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected\nIP address: ");
  Serial.println(WiFi.localIP());
}

// Connect to MQTT Broker
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xFFFF), HEX);
    
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("MQTT connected");
      client.subscribe("devices/air-conditioner/toggle");
      client.subscribe("devices/fan/toggle");
      client.subscribe("devices/light/toggle");
      client.subscribe("devices/status");
      client.subscribe("devices/toggle");
    } else {
      Serial.print("Failed to connect, rc=");
      Serial.print(client.state());  // In chi tiết lỗi để kiểm tra
      Serial.println(". Trying again in 5 seconds...");
      delay(5000);
    }
  }
}

// Callback for receiving MQTT messages
void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  DynamicJsonDocument doc(200);
  String mqtt_message;

  //Get the status of devices
  if (strcmp(topic, "devices/status") == 0) {
    doc["air-conditioner"] = digitalRead(led1) == HIGH ? "ON" : "OFF";
    doc["fan"] = digitalRead(led2) == HIGH ? "ON" : "OFF";
    doc["light"] = digitalRead(led3) == HIGH ? "ON" : "OFF";
    Serial.printf("Status of all devices");

    serializeJson(doc, mqtt_message);
    publishMessage("devices/status/response", mqtt_message, true);

    String mqtt_message;
    serializeJson(doc, mqtt_message);

    return;
  }

  // Handle toggle device
  if (strcmp(topic, "devices/air-conditioner/toggle") == 0) {
    digitalWrite(led1, message == "ON" ? HIGH : LOW);
    publishMessage("devices/air-conditioner/confirmation", mqtt_message, true);
  } else if (strcmp(topic, "devices/fan/toggle") == 0) {
    digitalWrite(led2, message == "ON" ? HIGH : LOW);
    publishMessage("devices/fan/confirmation", mqtt_message, true);
  } else if (strcmp(topic, "devices/light/toggle") == 0) {
    digitalWrite(led3, message == "ON" ? HIGH : LOW);
    publishMessage("devices/light/confirmation", mqtt_message, true);
  } else if(strcmp(topic, "devices/toggle") == 0) {
    digitalWrite(led1, message == "ON" ? HIGH : LOW);
    digitalWrite(led2, message == "ON" ? HIGH : LOW);
    digitalWrite(led3, message == "ON" ? HIGH : LOW);
  }



  doc["status"] = message;
  serializeJson(doc, mqtt_message);
}

// Publish MQTT messages
void publishMessage(const char* topic, const String& payload, boolean retained) {
  if (client.publish(topic, payload.c_str(), retained)) {
    Serial.println("Message published [" + String(topic) + "]: " + payload);
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  delay(2000);

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  Serial.print("Pinging ");
  Serial.print(mqtt_server);
  Serial.println("...");


  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read DHT11 values
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int light = analogRead(LDR_PIN); 
  // Check for errors
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Error reading from DHT11!");
    return;
  }

  int randomValue;
  
  // Keep generating random values and blinking LED if > 70
  do {
    randomValue = random(0, 101);  // Generate a random number between 0 and 100

    // If random value is greater than 70, blink warning LED
    if (randomValue > 70) {
      digitalWrite(led4, HIGH);  // Turn on LED
      delay(500);                           // Keep LED on for 500ms
      digitalWrite(led4, LOW);   // Turn off LED
      delay(500);                           // Keep LED off for 500ms
    }
  } while (randomValue > 70);  // Continue blinking until randomValue <= 70

  DynamicJsonDocument doc(128);
  doc["humidity"] = humidity;
  doc["temperature"] = temperature;
  doc["light"] = light;

  String mqtt_message;
  serializeJson(doc, mqtt_message);
  publishMessage("datasensor", mqtt_message, true);

  delay(2000);
}
