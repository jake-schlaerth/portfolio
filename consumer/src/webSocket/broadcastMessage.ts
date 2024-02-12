import { webSocketServer } from "./webSocketServer";

export const broadcastMessage = (data: string) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
