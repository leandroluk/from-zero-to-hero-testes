/**
 * @param {Record<string, any>} obj
 * @return {[string[], any[]]}
 */
const objToKeyValues = (obj) => Object
  .entries(obj)
  .filter(([key]) => key)
  .reduce((arr, items) => {
    arr[0].push(items[0]);
    arr[1].push(items[1]);
    return arr;
  }, [[], []]);

/**
 * @param {string} str 
 * @returns {string}
 */
const snake2camel = (str) => str
  .replace(/_+(.?)/g, (_, $1) => $1.toUpperCase());

/**
 * @param {string} str 
 * @returns {string}
 */
const camel2snake = (str) => str
  .replace(/([A-Z]+)/g, (_, $1) => `_${$1.toLowerCase()}`);

const empty2null = (arr) => arr
  .map((value) => ([undefined, null].includes(value) ? 'NULL' : value));

module.exports = {
  objToKeyValues,
  snake2camel,
  camel2snake,
  empty2null,
};
