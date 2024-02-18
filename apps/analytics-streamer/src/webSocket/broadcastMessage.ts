import WebSocket from "ws";

import { AnalyticsEvent } from "analytics-events";
import { webSocketServer } from "./webSocketServer";

export const broadcastMessage = (event: AnalyticsEvent) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("🚀 ~ sending ws message: ", event);
      client.send(JSON.stringify(event));
    }
  });
};
