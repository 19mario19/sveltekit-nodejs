/**
 * Converts the input data to a JSON string.
 * @param {any} data - The input data to be converted.
 * @returns {any} - A JSON representation of the input data.
 */
function toJSON(data: any) {
  return JSON.parse(JSON.stringify(data))
}

export { toJSON }
