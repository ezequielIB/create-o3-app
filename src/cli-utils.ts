import chalk from "chalk";
import type { PromptObject } from "prompts";
import type { O3StackOptions, O3StackAnswers } from "../types";

// Gradient Colors
const pastelEmerald = chalk.hex("#43e97b");
const pastelJade = chalk.hex("#38f9d7");
const pastelMint = chalk.hex("#36d1c4");
const pastelSeafoam = chalk.hex("#1de9b6");
const pastelTeal = chalk.hex("#1dc8e9");

// Prompt Colors
const pastelBlue = chalk.hex("#6ec1e4");
const pastelGreen = chalk.hex("#43e97b");
const pastelPurple = chalk.hex("#b388ff");
const pastelPink = chalk.hex("#ff8fab");
const pastelYellow = chalk.hex("#ffe066");

function gradientText(lines: string[]) {
  const palette = [
    pastelEmerald,
    pastelJade,
    pastelMint,
    pastelSeafoam,
    pastelTeal,
  ];
  const step = lines.length / (palette.length - 1);

  return lines.map((line, i) => {
    const startIndex = Math.floor(i / step);
    const endIndex = Math.min(startIndex + 1, palette.length - 1);
    const t = (i % step) / step;
    const colorFn = t < 0.5 ? palette[startIndex] : palette[endIndex];
    return chalk.bold(colorFn(line));
  });
}

export function printTitle() {
  const art = [
    "         _           _           ",
    "        /\\ \\       /\\ \\         ",
    "       / /\\ \\     /  \\ \\        ",
    "      / / /\\ \\   / /\\ \\ \\       ",
    "     / / /  \\ \\ / / /\\ \\ \\      ",
    "    / / /   /\\_\\\\/_//_\\ \\ \\     ",
    "   / / /   / / /  __\\___ \\ \\    ",
    "  / / /   / / /  / /\\   \\ \\ \\   ",
    " / / /___/ / /  / /_/____\\ \\ \\  ",
    "/ / /____\\/ /  /__________\\ \\ \\ ",
    "\\/_________/   \\_____________\\/ ",
  ];

  console.log("\n" + gradientText(art).join("\n"));

  const top = pastelTeal("╭───────────────────────────────────────╮");
  const mid =
    pastelJade("│     ") +
    pastelEmerald.bold("✨ Welcome to o3 Stack CLI! ✨") +
    pastelJade("    │");
  const bottom = pastelSeafoam("╰───────────────────────────────────────╯");

  console.log("\n" + top);
  console.log(mid);
  console.log(bottom + "\n");
}

export async function askProjectInfo(
  args: O3StackOptions = {}
): Promise<O3StackAnswers> {
  const questions: PromptObject[] = [];
  if (args.runTime === undefined) {
    questions.push({
      type: "select",
      name: "runTime",
      message: pastelPurple("⚡ Select your run-time:"),
      choices: [
        { title: "node", value: "node" },
        { title: "pnpm", value: "pnpm" },
        { title: "bun", value: "bun" },
        { title: "yarn", value: "yarn" },
      ],
      initial: 0,
    });
  }

  if (!args.projectName) {
    questions.push({
      type: "text",
      name: "projectName",
      message: pastelBlue("📦 What is your project name?"),
      initial: "my-o3-app",
    });
  }

  if (args.auth === undefined) {
    questions.push({
      type: "select",
      name: "auth",
      message: pastelGreen("🔑 Do you want auth? If so, choose a type:"),
      choices: [
        { title: "None", value: "none" },
        { title: "Better Auth", value: "better auth" },
        { title: "AuthJS", value: "authjs" },
      ],
      initial: 0,
    });
  }

  if (args.drizzleORM === undefined) {
    questions.push({
      type: "toggle",
      name: "drizzleORM",
      message: pastelPurple("🗄️ Include DrizzleORM?"),
      initial: true,
      active: "yes",
      inactive: "no",
    });
  }

  if (args.oRPC === undefined) {
    questions.push({
      type: "toggle",
      name: "oRPC",
      message: pastelPink("🔌 Include oRPC?"),
      initial: true,
      active: "yes",
      inactive: "no",
    });
  }

  if (args.git === undefined) {
    questions.push({
      type: "toggle",
      name: "git",
      message: pastelYellow("🌱 Initialize git repository?"),
      initial: true,
      active: "yes",
      inactive: "no",
    });
  }

  if (args.docker === undefined) {
    questions.push({
      type: "toggle",
      name: "docker",
      message: pastelBlue("🐳 Add Dockerfile?"),
      initial: false,
      active: "yes",
      inactive: "no",
    });
  }

  const answers =
    questions.length > 0
      ? await (await import("prompts")).default(questions as PromptObject[])
      : {};

  return { ...args, ...answers };
}
