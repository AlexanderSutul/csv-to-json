"use strict";

const { parseArgs } = require("node:util");

const NO_HEADERS = "no-headers";

function getArgs() {
  const { values } = parseArgs({
    options: {
      input: { type: "string", short: "i" },
      output: { type: "string", short: "o" },
      [NO_HEADERS]: { type: "boolean", short: "n" },
      verbose: { type: "boolean", short: "v" },
      delimiter: { type: "string", short: "d" },
      help: { type: "boolean" },
    },
  });
  return values;
}

function validateArgs({
  input,
  output,
  [NO_HEADERS]: noHeaders,
  verbose,
  help,
  delimiter,
}) {
  if (!input) {
    throw new Error("Input file is required (--input or -i)");
  }
  if (!output) {
    throw new Error("Output file is required (--output or -o)");
  }
  if (!delimiter) {
    throw new Error("Delimiter is required (--delimiter or -d)");
  }
  if (noHeaders !== undefined && typeof noHeaders !== "boolean") {
    throw new Error("No headers flag must be a boolean (--no-headers or -n)");
  }
  if (verbose !== undefined && typeof verbose !== "boolean") {
    throw new Error("Verbose flag must be a boolean (--verbose or -v)");
  }
  if (help !== undefined && typeof help !== "boolean") {
    throw new Error("Help flag must be a boolean (--help)");
  }
}

module.exports = { getArgs, validateArgs, NO_HEADERS };
