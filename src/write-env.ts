import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function createEnv(
  env: Record<string, string>,
  target: string
): Promise<void> {
  const envContent = Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const envPath = path.join(target, ".env");
  await writeFile(envPath, envContent, "utf8");
}
