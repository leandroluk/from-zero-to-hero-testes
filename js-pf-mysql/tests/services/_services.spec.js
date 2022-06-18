const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { runSchema } = require('../../src/services/_services');

use(chaiAsPromised);

const makeJoiError = (message) => {
  const name = 'ValidationError';
  const error = new Error(`${name}: ${message}`);
  error.name = name;
  error.details = [{ message }];
  return error;
};

describe('services/_services', () => {
  describe('runSchema', () => {
    it('should rejects if schema returns error', () => {
      const schema = { validate: () => ({ error: makeJoiError('error') }) };
      const validator = runSchema(schema);
      expect(validator()).to.eventually.be.rejected;
    });

    it('should resolve parsed value when no error', () => {
      const schema = { validate: (value) => ({ value }) };
      const validator = runSchema(schema);
      expect(validator(1)).to.eventually.be.equal(1);
    });
  });
});
