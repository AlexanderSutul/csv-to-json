"use strict";

const fs = require("fs");
const readline = require("readline");

class FileProcessor {
  constructor({
    lineProcessor,
    onStart,
    onFinish,
    options: { inputPath, outputPath, useHeaders, delimiter },
  }) {
    this.reader = readline.createInterface({
      input: fs.createReadStream(inputPath),
      crlfDelay: Infinity,
    });
    this.writer = fs.createWriteStream(outputPath);

    this.lineProcessor = lineProcessor;

    this.onStart = onStart;
    this.onFinish = onFinish;

    this.lineCounter = 0;

    this.useHeaders = useHeaders;
    this.delimiter = delimiter;

    this.headers = [];
  }

  #writeLine(line) {
    const preparedLine = this.lineProcessor.processLine(line, this.headers);
    const preparedDelimiter = this.#getDelimiter();
    this.writer.write(`${preparedDelimiter}\t${preparedLine}`);
  }

  #getDelimiter() {
    return this.lineCounter > (this.useHeaders ? 1 : 0)
      ? `${this.delimiter}\n`
      : "";
  }

  start() {
    this.onStart();
    this.writer.write("[\n");
    this.reader.on("line", (line) => {
      if (this.useHeaders && this.lineCounter === 0) {
        this.headers.push(...line.split(this.delimiter));
        this.lineCounter++;
        return;
      }
      this.#writeLine(line);
      this.lineCounter++;
    });

    this.reader.on("close", () => {
      this.writer.write("\n]\n");
      this.writer.end();

      this.onFinish({ lineCounter: this.lineCounter });
    });

    this.reader.on("error", (err) => {
      console.error("reader failed:", err);
      this.reader.close();
      this.writer.close();
    });

    this.writer.on("error", (err) => {
      console.error("writer failed:", err);
      this.reader.close();
      this.writer.close();
    });
  }
}

module.exports = { FileProcessor };
