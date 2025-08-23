// Types for o3-stack CLI options and answers

export enum AuthType {
  NONE = "none",
  BETTER_AUTH = "better auth",
  AUTHJS = "authjs",
}

export enum RunTime {
  NODE = "node",
  PNPM = "pnpm",
  BUN = "bun",
  YARN = "yarn",
}

export interface O3StackOptions {
  projectName?: string;
  auth?: AuthType;
  drizzleORM?: boolean;
  oRPC?: boolean;
  git?: boolean;
  docker?: boolean;
  runTime?: RunTime;
}

export interface O3StackAnswers extends O3StackOptions {
  // Extend with any additional answers if needed
}
