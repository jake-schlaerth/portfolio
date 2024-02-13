import { umzug } from "@/umzug";

(async () => {
  await umzug.up();
})();

// todo: this should run at build time
// real loop should be kafka consumer persisting events to db
