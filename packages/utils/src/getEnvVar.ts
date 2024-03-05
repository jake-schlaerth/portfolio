import dotenv from "dotenv";

dotenv.config();

export const getEnvVar = (envVar: string) => {
  const safeEnvVar = process.env[envVar];

  if (!safeEnvVar) {
    throw new Error(`Using undefined env var: ${envVar}`);
  }

  return safeEnvVar;
};
