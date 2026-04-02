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

function runGitCommand(command) {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function parseShortStat(output) {
  // Example:
  // " 7 files changed, 120 insertions(+), 18 deletions(-)"
  const filesChangedMatch = output.match(/(\d+)\s+files?\s+changed/);
  const insertionsMatch = output.match(/(\d+)\s+insertions?\(\+\)/);
  const deletionsMatch = output.match(/(\d+)\s+deletions?\(-\)/);

  return {
    filesChanged: filesChangedMatch ? Number(filesChangedMatch[1]) : 0,
    insertions: insertionsMatch ? Number(insertionsMatch[1]) : 0,
    deletions: deletionsMatch ? Number(deletionsMatch[1]) : 0,
  };
}

function getFilesAdded(fromCommit, toCommit) {
  const output = runGitCommand(
    `git diff --name-status ${fromCommit} ${toCommit}`,
  );

  if (!output) return 0;

  const lines = output.split(/\r?\n/).filter(Boolean);

  let filesAdded = 0;

  for (const line of lines) {
    // A\tpath/to/file
    if (line.startsWith("A\t")) {
      filesAdded += 1;
    }
  }

  return filesAdded;
}

function getChangedFilesList(fromCommit, toCommit) {
  const output = runGitCommand(
    `git diff --name-only ${fromCommit} ${toCommit}`,
  );

  if (!output) return [];

  return output.split(/\r?\n/).filter(Boolean);
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
  const feature = getArgValue("--feature", "unknown");
  const fromCommit = getArgValue("--from", "");
  const toCommit = getArgValue("--to", "");
  const notes = getArgValue("--notes", "");

  if (!fromCommit || !toCommit) {
    console.error(
      'Error: both --from and --to commit hashes are required.\nExample:\nnode scripts/measure-iteration.mjs --architecture monolith --feature "categories" --from c033f00 --to abc1234',
    );
    process.exit(1);
  }

  const projectRoot = process.cwd();
  const outputPath = path.join(projectRoot, "metrics-iteration.xlsx");
  const sheetName = "iterations";

  const shortStatOutput = runGitCommand(
    `git diff --shortstat ${fromCommit} ${toCommit}`,
  );

  const { filesChanged, insertions, deletions } =
    parseShortStat(shortStatOutput);
  const filesAdded = getFilesAdded(fromCommit, toCommit);
  const changedFiles = getChangedFilesList(fromCommit, toCommit);

  const row = {
    measuredAt: getNow(),
    architecture,
    feature,
    fromCommit,
    toCommit,
    filesChanged,
    filesAdded,
    insertions,
    deletions,
    changedFilesList: changedFiles.join("\n"),
    notes,
  };

  const existingRows = readExistingRows(outputPath, sheetName);
  existingRows.push(row);
  writeRowsToWorkbook(outputPath, sheetName, existingRows);

  console.log("Iteration measurement saved:");
  console.table([
    {
      measuredAt: row.measuredAt,
      architecture: row.architecture,
      feature: row.feature,
      fromCommit: row.fromCommit,
      toCommit: row.toCommit,
      filesChanged: row.filesChanged,
      filesAdded: row.filesAdded,
      insertions: row.insertions,
      deletions: row.deletions,
    },
  ]);

  console.log(`Saved to: ${outputPath}`);
}

main();
