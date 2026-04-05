#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import XLSX from "xlsx";

function getArgValue(flag, fallback = "") {
  const index = process.argv.indexOf(flag);
  if (index !== -1 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }
  return fallback;
}

function getNow() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function runGitCommand(command, cwd = process.cwd()) {
  return execSync(command, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function parseShortStat(output) {
  const filesChangedMatch = output.match(/(\d+)\s+files?\s+changed/);
  const insertionsMatch = output.match(/(\d+)\s+insertions?\(\+\)/);
  const deletionsMatch = output.match(/(\d+)\s+deletions?\(-\)/);

  return {
    filesChanged: filesChangedMatch ? Number(filesChangedMatch[1]) : 0,
    insertions: insertionsMatch ? Number(insertionsMatch[1]) : 0,
    deletions: deletionsMatch ? Number(deletionsMatch[1]) : 0,
  };
}

function getRepoRoot() {
  return runGitCommand("git rev-parse --show-toplevel");
}

function toGitPath(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function getCurrentProjectInfo() {
  const cwd = process.cwd();
  const repoRoot = getRepoRoot();
  const relativeProjectPath = path.relative(repoRoot, cwd);

  if (!relativeProjectPath || relativeProjectPath.startsWith("..")) {
    throw new Error(
      "Script must be run from inside a project folder within the git repository.",
    );
  }

  return {
    cwd,
    repoRoot,
    projectPath: toGitPath(relativeProjectPath),
    architecture: path.basename(cwd),
  };
}

function getFilesAdded(fromCommit, toCommit, projectPath, repoRoot) {
  const output = runGitCommand(
    `git diff --name-status ${fromCommit} ${toCommit} -- "${projectPath}"`,
    repoRoot,
  );

  if (!output) return 0;

  const lines = output.split(/\r?\n/).filter(Boolean);
  let filesAdded = 0;

  for (const line of lines) {
    if (line.startsWith("A\t")) {
      filesAdded += 1;
    }
  }

  return filesAdded;
}

function getChangedFilesList(fromCommit, toCommit, projectPath, repoRoot) {
  const output = runGitCommand(
    `git diff --name-only ${fromCommit} ${toCommit} -- "${projectPath}"`,
    repoRoot,
  );

  if (!output) return [];
  return output.split(/\r?\n/).filter(Boolean);
}

function countCodeLines(projectDir) {
  const sourceDir = path.join(projectDir, "src");

  if (!fs.existsSync(sourceDir)) {
    return 0;
  }

  const includedExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);
  let total = 0;

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      const ext = path.extname(entry.name).toLowerCase();
      if (!includedExtensions.has(ext)) continue;

      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content.split(/\r?\n/).length;
      total += lines;
    }
  }

  walk(sourceDir);
  return total;
}

function readExistingRows(xlsxPath, sheetName) {
  if (!fs.existsSync(xlsxPath)) return [];

  const workbook = XLSX.readFile(xlsxPath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function writeRowsToWorkbook(xlsxPath, sheetName, rows) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = fs.existsSync(xlsxPath)
    ? XLSX.readFile(xlsxPath)
    : XLSX.utils.book_new();

  workbook.Sheets[sheetName] = worksheet;

  if (!workbook.SheetNames.includes(sheetName)) {
    workbook.SheetNames.push(sheetName);
  }

  XLSX.writeFile(workbook, xlsxPath);
}

function main() {
  const fromCommit = getArgValue("--from");
  const toCommit = getArgValue("--to");

  if (!fromCommit || !toCommit) {
    console.error(
      "Error: --from and --to are required.\nExample:\nnode measure-iteration.mjs --from abc1234 --to def5678",
    );
    process.exit(1);
  }

  const { cwd, repoRoot, projectPath, architecture } = getCurrentProjectInfo();
  const outputPath = path.join(cwd, "metrics-iteration.xlsx");
  const sheetName = "iterations";

  const shortStatOutput = runGitCommand(
    `git diff --shortstat ${fromCommit} ${toCommit} -- "${projectPath}"`,
    repoRoot,
  );

  const { filesChanged, insertions, deletions } =
    parseShortStat(shortStatOutput);

  const filesAdded = getFilesAdded(fromCommit, toCommit, projectPath, repoRoot);
  const changedFiles = getChangedFilesList(
    fromCommit,
    toCommit,
    projectPath,
    repoRoot,
  );
  const codeLines = countCodeLines(cwd);

  const row = {
    measuredAt: getNow(),
    architecture,
    fromCommit,
    toCommit,
    projectPath,
    filesChanged,
    filesAdded,
    insertions,
    deletions,
    codeLines,
    changedFilesList: changedFiles.join("\n"),
  };

  const existingRows = readExistingRows(outputPath, sheetName);
  existingRows.push(row);
  writeRowsToWorkbook(outputPath, sheetName, existingRows);

  console.log("Iteration measurement saved:");
  console.table([
    {
      measuredAt: row.measuredAt,
      architecture: row.architecture,
      fromCommit: row.fromCommit,
      toCommit: row.toCommit,
      projectPath: row.projectPath,
      filesChanged: row.filesChanged,
      filesAdded: row.filesAdded,
      insertions: row.insertions,
      deletions: row.deletions,
      codeLines: row.codeLines,
    },
  ]);

  console.log(`Saved to: ${outputPath}`);
}

main();
