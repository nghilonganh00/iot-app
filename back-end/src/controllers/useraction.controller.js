import client from "../config/connectMQTT";
import UserActionService from "../services/useraction.service";

const UserActionController = {
  toggle: async (req, res) => {
    try {
      const { device, status } = req.body;
      const ledTopic = `devices/${device}/toggle`;
      const confirmationTopic = `devices/${device}/confirmation`;
      let responseSent = false;

      const sendResponse = (statusCode, message, data = {}) => {
        if (!responseSent) {
          responseSent = true;
          res.status(statusCode).json({ data, message });
        }
      };

      const confirmationHandler = async (topic, message) => {
        if (topic === confirmationTopic) {
          clearTimeout(timeout);
          await UserActionService.create({ device, status: status === "ON" });

          sendResponse(200, `${device} is now ${status}`, message.toString());
        }
      };

      const timeout = setTimeout(() => {
        sendResponse(500, "Timeout waiting for confirmation");
        client.removeListener("message", confirmationHandler);
      }, 10000);

      client.publish(ledTopic, status, (err) => {
        if (err) return sendResponse(500, "Failed to send the message");
        console.log("Message sent successfully");
      });

      client.on("message", confirmationHandler);
    } catch (error) {
      console.error("Toggling the device failed:", error);
      res.status(500).json({
        data: {},
        message: "Internal Server Error",
      });
    }
  },

  getStatus: async (req, res) => {
    try {
      const topic = `devices/status`;
      const responseTopic = "devices/status/response";
      let responseSent = false;

      const sendResponse = (statusCode, message, data = {}) => {
        if (!responseSent) {
          responseSent = true;
          res.status(statusCode).json({ data, message });
        }
      };

      const timeout = setTimeout(() => {
        sendResponse(500, "Timeout waiting for confirmation");
      }, 10000);

      client.publish(topic, "", (err) => {
        if (err) return sendResponse(500, "Failed to send the message");
        console.log("Message sent successfully");
      });

      client.once("message", (topic, message) => {
        if (topic === responseTopic) {
          clearTimeout(timeout);
          sendResponse(
            200,
            "Get status of all devices successfully",
            message.toString()
          );
        }
      });
    } catch (error) {
      console.error("Getting status failed:", error);
      res.status(500).json({
        data: {},
        message: "Internal Server Error",
      });
    }
  },

  handleGetAll: async (req, res) => {
    try {
      const { limit, page, sortBy, sortDirection, searchKey, searchType } =
        req.query;

      const actionHistory = await UserActionService.getAll({
        limit,
        page,
        sortBy,
        sortDirection,
        searchKey,
        searchType,
      });

      return res.status(200).json({
        data: actionHistory,
        message: "Get action history successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        data: [],
        message: `Interval Server Error: ${error}`,
      });
    }
  },
};

export default UserActionController;
