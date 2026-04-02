#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import { globSync } from "glob";
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

function getGitCommitHash() {
  try {
    return execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unknown";
  }
}

function getAllSourceFiles(srcDir) {
  if (!fs.existsSync(srcDir)) return [];

  return globSync("**/*.{js,jsx,ts,tsx,css,scss,json}", {
    cwd: srcDir,
    absolute: true,
    nodir: true,
    ignore: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
  });
}

function countCodeLinesInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  let codeLines = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) continue;
    if (trimmed.startsWith("//")) continue;
    if (trimmed.startsWith("/*")) continue;
    if (trimmed.startsWith("*")) continue;
    if (trimmed.startsWith("*/")) continue;

    codeLines += 1;
  }

  return codeLines;
}

function getCodeLines(srcDir) {
  const files = getAllSourceFiles(srcDir);
  let totalCodeLines = 0;

  for (const file of files) {
    totalCodeLines += countCodeLinesInFile(file);
  }

  return totalCodeLines;
}

function getDirectorySizeBytes(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;

  const stat = fs.statSync(dirPath);

  if (stat.isFile()) {
    return stat.size;
  }

  let total = 0;
  const entries = fs.readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    total += getDirectorySizeBytes(fullPath);
  }

  return total;
}

function bytesToMb(bytes) {
  return +(bytes / (1024 * 1024)).toFixed(2);
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
  const architecture = getArgValue("--architecture", "unknown");
  const notes = getArgValue("--notes", "");

  const projectRoot = process.cwd();
  const srcDir = path.join(projectRoot, "src");
  const nextDir = path.join(projectRoot, ".next");

  const outputPath = path.join(projectRoot, "metrics-baseline.xlsx");
  const sheetName = "baseline";

  const sourceFiles = getAllSourceFiles(srcDir);
  const filesCount = sourceFiles.length;
  const codeLines = getCodeLines(srcDir);
  const nextSizeMb = bytesToMb(getDirectorySizeBytes(nextDir));
  const commitHash = getGitCommitHash();
  const measuredAt = getNow();

  const row = {
    measuredAt,
    architecture,
    commitHash,
    filesCount,
    codeLines,
    nextSizeMb,
    notes,
  };

  const existingRows = readExistingRows(outputPath, sheetName);
  existingRows.push(row);
  writeRowsToWorkbook(outputPath, sheetName, existingRows);

  console.log("Measurement saved:");
  console.table([row]);
}

main();
