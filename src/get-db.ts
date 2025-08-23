import { instantNeon } from "neondb/sdk";
import path from "path";

export async function createEphemeralDb(target: string): Promise<string> {
  const data = await instantNeon({
    dotEnvFile: path.join(target, ".env"),
    dotEnvKey: "DATABASE_URL",
    referrer: "npm:create-o3-app",
  });
  return data.databaseUrl;
}
