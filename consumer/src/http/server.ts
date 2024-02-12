import http from "http";
import { config } from "@/config";

const setupServer = () => {
  const server = http.createServer();

  server.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });

  return server;
};

export const server = setupServer();
