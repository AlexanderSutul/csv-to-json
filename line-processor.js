"use strict";

class LineProcessor {
  constructor({ delimiter }) {
    this.delimiter = delimiter;
  }

  processLine(...args) {
    return this.#compileObject(...args);
  }

  #compileObject(...args) {
    const [params, headers] = args;

    if (!params.length) return;

    const values = params.split(this.delimiter);
    const iter = headers.length ? headers : values;
    const obj = {};
    for (let i = 0; i < iter.length; i++) {
      const value = values[i];
      const key = headers[i] ?? i;
      obj[key] = this.#autoTypeCast(value);
    }
    return JSON.stringify(obj);
  }

  #autoTypeCast(value) {
    if (value === null || value === undefined) return value;
    if (typeof value !== "string") return value;

    // Boolean
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;

    // Null
    if (value.toLowerCase() === "null") return null;

    // Undefined
    if (value.toLowerCase() === "undefined") return undefined;

    // Number
    if (!isNaN(value) && value.trim() !== "") return Number(value);

    // Date
    const date = new Date(value);
    if (!isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(value)) return date;

    return value;
  }
}

module.exports = { LineProcessor };
