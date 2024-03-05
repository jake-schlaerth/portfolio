import WebSocket from "ws";
import { server } from "@/http";

const setupWebSocketServer = () => {
  const webSocketServer = new WebSocket.Server({ server });

  webSocketServer.on("connection", function connection(ws) {
    console.log("A client connected");

    ws.on("message", function incoming(message) {
      console.log("received: %s", message);
    });

    // Add any other event listeners here
  });

  return webSocketServer;
};

export const webSocketServer = setupWebSocketServer();
