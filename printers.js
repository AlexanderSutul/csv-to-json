#!/usr/bin/env node

"use strict";

const { pathToFileURL } = require("node:url");

function printTotal(lineCount) {
  console.log(
    `
---------------Total lines---------------------
Count: ${lineCount}
---------------Total amount---------------------
`
  );
}

function reportMemory() {
  const used = process.memoryUsage();
  console.log(`
---------------Memory Usage---------------------
${Object.keys(used)
  .map((key) => {
    const mb = (used[key] / 1024 / 1024).toFixed(2);
    return `${key.padEnd(12)} ${mb.padStart(8)} MB`;
  })
  .join("\n")}
---------------Memory Usage---------------------
`);
}

function help() {
  console.log(`
      Usage:
        csv-to-json-[linux|macos|win.exe] [options]

      Options:
        -i, --input=<path>       Path to input CSV file
        -o, --output=<path>      Path to output JSON file
        -h, --headers            Treat first CSV row as headers
        -v, --verbose            Enable verbose logging
            --help               Show this help message

      Examples:
        csv-to-json-[linux|macos|win.exe] -i data.csv -o data.json
        csv-to-json-[linux|macos|win.exe] --input users.csv --headers --verbose
      `);
}

function printFilePath(path) {
  const url = pathToFileURL(path);
  console.log(`✅ File path: ${url}`);
}

module.exports = { printTotal, reportMemory, help, printFilePath };
