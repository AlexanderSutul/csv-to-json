"use strict";

const { parseArgs } = require("node:util");

function getArgs() {
  const { values } = parseArgs({
    options: {
      input: { type: "string", short: "i" },
      output: { type: "string", short: "o" },
      headers: { type: "boolean", short: "h" },
      verbose: { type: "boolean", short: "v" },
      delimiter: { type: "string", short: "v" },
      help: { type: "boolean" },
    },
  });
  return values;
}

function validateArgs({ input, output, headers, verbose, help, delimiter }) {
  if (!input) {
    throw new Error("Input file is required (--input or -i)");
  }
  if (!output) {
    throw new Error("Output file is required (--output or -o)");
  }
  if (!delimiter) {
    throw new Error("Delimiter is required (--delimiter or -d)");
  }
  if (headers !== undefined && typeof headers !== "boolean") {
    throw new Error("Headers flag must be a boolean (--headers or -h)");
  }
  if (verbose !== undefined && typeof verbose !== "boolean") {
    throw new Error("Verbose flag must be a boolean (--verbose or -v)");
  }
  if (help !== undefined && typeof help !== "boolean") {
    throw new Error("Help flag must be a boolean (--help)");
  }
}

module.exports = { getArgs, validateArgs };
