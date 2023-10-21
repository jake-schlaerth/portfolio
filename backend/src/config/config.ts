import { getEnvVar } from "./getEnvVar";

export const getConfig = (): Config => {
  return {
    DB_CONNECTION_STRING: getEnvVar("DB_CONNECTION_STRING"),
  };
};

interface Config {
  DB_CONNECTION_STRING: string;
}
