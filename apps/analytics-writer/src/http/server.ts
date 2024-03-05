import http from "node:http";

import { getEnvVar } from "utils";

export const setupServer = () => {
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

  server.listen(getEnvVar("PORT"), () => {
    console.log(`Server started on port ${getEnvVar("PORT")}`);
  });

  return server;
};
