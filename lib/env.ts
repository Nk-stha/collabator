export const env = {
  API_BASE_URL: getEnvWithDefault('NEXT_PUBLIC_API_BASE_URL', 'https://main.chargeghar.com/api'),
} as const;

function getEnvWithDefault(key: string, defaultValue: string): string {
  const value = process.env[key];
  return value || defaultValue;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
