import { config } from "@/config";
import { server } from "@/http";
import { run } from "@/server";

run().catch(console.error);

server.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
