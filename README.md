# csv-to-json

Streaming-friendly CLI utility for turning large CSV files into JSON without loading everything into memory.

## Features
- Processes CSV input line by line via Node.js streams to keep memory usage low.
- Supports optional header rows to produce key-based JSON objects; otherwise columns fall back to numeric keys.
- Verbose mode reports timing, memory usage, and row counts for easy benchmarking.
- Optional packaging script builds standalone binaries for macOS, Linux, and Windows using `pkg`.

## Prerequisites
- Node.js 18 or newer (the CLI uses `util.parseArgs`, introduced in Node 18).
- For packaging binaries, install `pkg` globally or rely on the `devDependencies`.

## Quick Start

```bash
git clone https://github.com/<your-org>/csv-to-json.git
cd csv-to-json
npm install   # only required if you plan to build binaries with pkg
```

### Convert CSV to JSON

```bash
node index.js --input data/sample.csv --output data/sample.json --headers
```

- `--input/-i`: path to the source CSV file.
- `--output/-o`: where to write the JSON array.
- `--headers/-h`: treat the first CSV row as column names (omit it to use numeric column keys).
- `--delimiters/-d`: delimiter in CSV.
- `--verbose/-v`: print processing time, memory usage, and total rows after completion.
- `--help`: show CLI usage info.

When `--headers` is enabled, the JSON output is an array of objects keyed by column name. Without headers, numeric indexes (`"0"`, `"1"`, …) are used instead.

#### Example

`people.csv`

```csv
name,age,active
Ada,32,true
Grace,28,false
```

Convert:

```bash
node index.js -i people.csv -o people.json -h
```

Result (`people.json`):

```json
[{"name":"Ada","age":"32","active":"true"},{"name":"Grace","age":"28","active":"false"}]
```

Verbose mode example:

```bash
node index.js -i people.csv -o people.json -h -v
```

Outputs the generated file path plus timing, memory, and row count statistics.

## Building Standalone Binaries

The project ships with an `npm run binary` script that uses `pkg` to bundle `index.js` into native executables:

```bash
npm run binary
```

Outputs land in `bin/csv-to-json-[platform]`. Update the target list in `package.json` if you need different Node versions or architectures.

## Development Notes
- Error handling ensures both reader and writer streams close cleanly on failure and report helpful messages.
- JSON output is a single array written incrementally (`[obj,obj,...]`) to avoid trailing commas.
- The CLI prints the final output file URL so you can open it directly in supporting tools.
