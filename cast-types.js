function autoTypeCast(value) {
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

module.exports = { autoTypeCast };
