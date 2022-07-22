/**
 * @param {import('joi').Schema} schema 
 * @param {unknown} unknown
 * @returns {Promise<any>}
 */
const runSchema = (schema) => async (unknown) => {
  const { error, value } = schema.validate(unknown);
  if (error) {
    error.message = error.details[0].message;
    throw error;
  }
  return value;
};

const throwNotFoundError = (message) => {
  const error = new Error(message)
  error.name = 'NotFoundError'
  throw error
}

module.exports = {
  runSchema,
  throwNotFoundError
};
