import http from "http";
import { config } from "@/config";

const setupServer = () => {
  const server = http.createServer((req, res) => {
    if (req.url === "/healthz") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: "up" }));
    } else {
      res.statusCode = 404;
      res.end("Not Found");
    }
  });

  server.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });

  return server;
};

export const server = setupServer();
