import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/connectDB";
import DatasensorService from "./services/datasensor.service";
import initWebRoutes from "./routes";
import client from "./config/connectMQTT";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
initWebRoutes(app);

client.on("connect", () => {
  const topic = "datasensor";
  console.log("Connected to MQTT broker");
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.error(`Failed to subscribe to topic: ${err.message}`);
    }
  });
});

client.on("message", async (topic, message) => {
  // console.log(`Received message from MQTT: ${message.toString()}`);
  if (topic === "datasensor") {
    const datasensor = JSON.parse(message);

    // Emit the received message to all connected Socket.IO clients
    const newDatasensor = await DatasensorService.create({
      temperature: datasensor.temperature,
      humidity: datasensor.humidity,
      light: datasensor.light,
    });

    io.emit("data", {
      message: message.toString(),
      timestamp: newDatasensor.createdAt,
    });
  }
});

client.on("error", (err) => {
  console.error("Failed to connect to MQTT broker:", err.message);
});

io.on("connection", (socket) => {
  socket.emit("welcome", { message: "Welcome to the Socket.IO server!" });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
