"use strict";

function createBenchmark() {
  const processing = "processing";
  return {
    start: () => console.time(processing),
    end: () => {
      console.log(`---------------Time of Processing---------------------`);
      console.timeEnd(processing);
      console.log(`---------------Time of Processing---------------------`);
    },
  };
}

module.exports = { createBenchmark };
