#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const { getArgs, validateArgs, NO_HEADERS } = require("./flags");
const { reportMemory, help, printTotal, printFilePath } = require("./printers");
const { createBenchmark } = require("./bench");
const { autoTypeCast } = require("./cast-types");

const args = getArgs();
if (args.help) {
  help();
  process.exit(0);
}

validateArgs(args);

const inputPath = path.resolve(args.input);
const outputPath = path.resolve(args.output);

const reader = fs.createReadStream(inputPath, { encoding: "utf8" });
const rl = readline.createInterface({
  input: reader,
  crlfDelay: Infinity,
});

const writer = fs.createWriteStream(outputPath, { encoding: "utf8" });

const hasHeader = !args[NO_HEADERS];

const headers = [];
let lineCount = 0;

const bench = createBenchmark();

bench.start();

writer.write("[");

const { delimiter } = args;

rl.on("line", (line) => {
  if (lineCount > (hasHeader ? 1 : 0)) writer.write(delimiter);
  if (hasHeader && lineCount === 0) {
    lineCount++;
    headers.push(...line.split(delimiter));
    return;
  }
  appendLine(line);
  lineCount++;
});

function appendLine(params) {
  const values = params.split(delimiter);
  const iter = hasHeader ? headers : values;
  let obj = {};
  for (let i = 0; i < iter.length; i++) {
    const key = hasHeader ? headers[i] : i;
    const value = values[i];
    obj[key] = autoTypeCast(value);
  }
  writer.write(JSON.stringify(obj));
}

rl.on("close", () => {
  writer.write("]\n");
  writer.end();

  if (args.verbose) {
    bench.end();
    reportMemory();
    printTotal(lineCount);
  }

  printFilePath(args.output);
});

reader.on("error", (err) => {
  console.error("reader failed:", err);
  rl.close();
});

writer.on("error", (err) => {
  console.error("writer failed:", err);
  rl.close();
});
