#!/usr/bin/env node

import { Command } from "commander";
import { printTitle, askProjectInfo } from "./cli-utils.js";
import {
  type O3StackOptions,
  type O3StackAnswers,
  AuthType,
  RunTime,
} from "../types";
import { execa } from "execa";
import { existsSync, readdirSync, mkdirSync } from "node:fs";
import path from "node:path";
import { copyTemplateDir } from "../utils/copy";
import { fileURLToPath } from "node:url";
import { mergePackageJson } from "../utils/merge-partials.js";

function getCurrentDir() {
  return path.dirname(fileURLToPath(import.meta.url));
}

// Template copying helper
async function copyTemplateWithPartials(
  templatePath,
  target,
  answers,
  partials
) {
  await copyTemplateDir(templatePath, target, answers);

  const partialPath = path.join(templatePath, "package.partial.json");
  if (existsSync(partialPath)) {
    partials.push(partialPath);
  }
}

// Auth template handling
async function handleAuthTemplates(answers, target, partials) {
  if (answers.auth === AuthType.NONE) return;

  const authTypeMap = {
    [AuthType.BETTER_AUTH]: "better-auth",
    [AuthType.AUTHJS]: "authjs",
  };

  const authType = authTypeMap[answers.auth];
  if (!authType) return;

  const authBasePath = path.resolve(
    getCurrentDir(),
    `../templates/${authType}/base`
  );
  await copyTemplateWithPartials(authBasePath, target, answers, partials);

  if (answers.drizzleORM) {
    const authDrizzlePath = path.resolve(
      getCurrentDir(),
      `../templates/${authType}/drizzle`
    );
    await copyTemplateWithPartials(authDrizzlePath, target, answers, partials);
  }
}

// oRPC template handling
async function handleOrpcTemplates(answers, target, partials) {
  if (!answers.oRPC) return;

  const orpcBasePath = path.resolve(getCurrentDir(), "../templates/orpc/base");
  await copyTemplateWithPartials(orpcBasePath, target, answers, partials);

  if (answers.drizzleORM) {
    const orpcDrizzlePath = path.resolve(
      getCurrentDir(),
      "../templates/orpc/drizzle"
    );
    await copyTemplateWithPartials(orpcDrizzlePath, target, answers, partials);
  }
}

// Git initialization
async function handleGitInit(answers, target) {
  if (!answers.git) return;

  console.log(`\nInitializing git in ${target}...`);
  try {
    await execa("git", ["init"], { cwd: target });
    console.log("Git repository initialized.");
  } catch (err) {
    console.error(
      "Failed to initialize git. Is git installed?",
      err.message || err
    );
  }
}

// Dependency installation
async function handleDependencyInstallation(answers, target) {
  const { withSpinner } = await import("./spinner.js");

  const installCommands = {
    [RunTime.NODE]: {
      message: "Installing dependencies for Node.js...",
      command: "npm",
      args: ["install"],
    },
    [RunTime.PNPM]: {
      message: "Installing dependencies for PNPM...",
      command: "pnpm",
      args: ["install"],
    },
    [RunTime.BUN]: {
      message: "Installing dependencies for Bun...",
      command: "bun",
      args: ["install"],
    },
    [RunTime.YARN]: {
      message: "Installing dependencies for Yarn...",
      command: "yarn",
      args: [],
    },
  };

  const installConfig = installCommands[answers.runTime];
  if (!installConfig) return;

  await withSpinner(installConfig.message, async () => {
    await execa(installConfig.command, installConfig.args, {
      cwd: target,
      stdio: "inherit",
    });
  });
}

// Display final selections
function displaySelections(answers) {
  const shownKeys = [
    "projectName",
    "auth",
    "drizzleORM",
    "oRPC",
    "git",
    "docker",
    "runTime",
  ];

  console.log("\nYour selections:");
  for (const key of shownKeys) {
    if (answers[key] !== undefined && answers[key] !== null) {
      console.log(`  ${key}: ${answers[key]}`);
    }
  }
}

// Project directory validation and setup
function setupProjectDirectory(answers) {
  const dir = path.basename(answers.projectName);
  if (existsSync(dir) && readdirSync(dir).length > 0) {
    console.error(
      `\nError: Directory "${dir}" already exists and is not empty.`
    );
    process.exit(1);
  }

  const target = path.resolve(process.cwd(), dir);

  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }

  return target;
}

async function main() {
  printTitle();

  const program = new Command();
  program
    .name("create-o3-app")
    .description("Create a new o3 stack project with beautiful prompts!")
    .option("-n, --project-name <name>", "Project name")
    .option("--better-auth", "Include betterAuth")
    .option("--no-better-auth", "Do not include betterAuth")
    .option("--drizzle-orm", "Include DrizzleORM")
    .option("--no-drizzle-orm", "Do not include DrizzleORM")
    .option("--orpc", "Include oRPC")
    .option("--no-orpc", "Do not include oRPC")
    .option("--git", "Initialize git repository")
    .option("--no-git", "Do not initialize git repository")
    .option("--docker", "Add Dockerfile")
    .option("--no-docker", "Do not add Dockerfile")
    .option("--run-time <runtime>", "Select run-time: node, pnpm, bun, yarn")
    .parse(process.argv);

  const opts = program.opts();
  const args: O3StackOptions = {
    projectName: opts.projectName,
    auth: opts.auth, // TODO: Add --auth CLI option in the future
    drizzleORM: opts.drizzleOrm,
    oRPC: opts.orpc,
    git: opts.git,
    docker: opts.docker,
    runTime: opts.runTime,
  };

  const answers: O3StackAnswers = await askProjectInfo(args);

  // Setup project directory
  const target = setupProjectDirectory(answers);

  // Initialize partials array for tracking package.partial.json files
  const partials: string[] = [];

  // Scaffold base template
  const templateDir = path.resolve(getCurrentDir(), "../templates/base");
  await copyTemplateDir(templateDir, target, {
    ...answers,
    orpcImport: answers.oRPC ? "import '../lib/orpc.server'" : "",
  });

  const basePartialPath = path.resolve(
    getCurrentDir(),
    "../templates/base/package.partial.json"
  );
  if (existsSync(basePartialPath)) {
    partials.push(basePartialPath);
  }

  // Handle DrizzleORM
  if (answers.drizzleORM) {
    const drizzlePath = path.resolve(
      getCurrentDir(),
      "../templates/drizzle/base"
    );
    await copyTemplateWithPartials(drizzlePath, target, answers, partials);
  }

  // Handle authentication templates
  await handleAuthTemplates(answers, target, partials);

  // Handle oRPC templates
  await handleOrpcTemplates(answers, target, partials);

  // Handle git initialization
  await handleGitInit(answers, target);

  // Merge Partials
  await mergePackageJson(target, partials);

  // Handle dependency installation
  await handleDependencyInstallation(answers, target);
}

main();
