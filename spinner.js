"use strict";

class Spinner {
  constructor({ tickTime }) {
    this.currentPos = 0;
    this.interval = null;
    this.tickTime = tickTime;
  }

  run() {
    this.interval = setInterval(() => {
      const spinnerFrames = ["|", "/", "-", "\\"];
      const spin = spinnerFrames[this.currentPos++ % spinnerFrames.length];
      process.stdout.write("\r" + spin + " Processing...");
    }, this.tickTime);
  }

  stop() {
    clearInterval(this.interval);
    process.stdout.write("\n");
  }
}

module.exports = { Spinner };
