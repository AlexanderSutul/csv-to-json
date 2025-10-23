#!/usr/bin/env node

"use strict";

const path = require("path");

const { getArgs, validateArgs, NO_HEADERS } = require("./flags");
const { reportMemory, help, printTotal, printFilePath } = require("./printers");
const { createBenchmark } = require("./bench");
const { LineProcessor } = require("./line-processor");
const { FileProcessor } = require("./file-processor");
const { Spinner } = require("./spinner");

const args = getArgs();
if (args.help) {
  help();
  process.exit(0);
}

validateArgs(args);

const bench = createBenchmark();

let spinner;
if (args.progress) spinner = new Spinner({ tickTime: 100 });

const lineProcessor = new LineProcessor({ delimiter: args.delimiter });

const fileProcessorOptions = {
  inputPath: path.resolve(args.input),
  outputPath: path.resolve(args.output),
  useHeaders: !args[NO_HEADERS],
  delimiter: args.delimiter,
};

const onStart = () => {
  spinner?.run();

  bench.start();
};

const onFinish = ({ lineCounter }) => {
  spinner?.stop();

  if (args.verbose) {
    bench.end();
    reportMemory();
    printTotal(lineCounter);
  }

  printFilePath(args.output);
};

const fileProcessor = new FileProcessor({
  lineProcessor,
  onStart,
  onFinish,
  options: fileProcessorOptions,
});

fileProcessor.start();
