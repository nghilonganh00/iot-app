import mqtt from "mqtt";

const connectUrl = `mqtt://192.168.162.102:1993`;
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 2000,
  username: "LeVanThien1",
  password: "123",
  reconnectPeriod: 1000,
});

const topics = [
  "devices/status/response",
  "devices/air-conditioner/confirmation",
  "devices/fan/confirmation",
  "devices/light/confirmation",
  "devices/wind/confirmation",
  "devices/wind/warning",
];

topics.forEach((topic) => {
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to ${topic}:`, err.message);
    }
  });
});

export default client;
