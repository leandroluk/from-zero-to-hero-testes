/**
 * @param {Record<string, any>} obj 
 * @param {Record<string, string} snakeFields 
 * @return {Record<string, any>}
 */
const camelFields2Snake = (obj, fields) => Object
  .keys(obj)
  .reduce((newObj, field) => ({
    ...newObj, [fields[field] || field]: obj[field],
  }), {});

/**
 * @param {Record<string, any>} obj 
 * @param {Record<string, string} snakeFields 
 * @return {string}
 */
const selectSnakeAsCamel = (fields) => Object
  .entries(fields)
  .map(([key, value]) => `\`${value}\` AS \`${key}\``)
  .join(', ');

module.exports = {
  camelFields2Snake,
  selectSnakeAsCamel,
};
