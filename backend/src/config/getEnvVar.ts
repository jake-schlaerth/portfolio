export const getEnvVar = (key: string): string => {
  const value = process.env[key];

  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};
