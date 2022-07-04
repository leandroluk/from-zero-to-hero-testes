import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Schema, ValidationError } from 'joi';
import { runSchema } from '../../src/services/_services';

use(chaiAsPromised);

const makeJoiError = (message = 'message'): ValidationError => {
  const error = new ValidationError(
    `ValidationError: ${message}`,
    [{ message }],
    null,
  );
  return error;
};

describe('services/_services', () => {
  describe('runSchema', () => {
    it('should rejects if schema returns error', () => {
      const schema = { validate: () => ({ error: makeJoiError('error') }) };
      const validator = runSchema(schema as Schema);
      expect(validator('')).to.eventually.be.rejected;
    });

    it('should resolve parsed value when no error', () => {
      const schema = { validate: (value: any) => ({ value }) };
      const validator = runSchema(schema as Schema);
      expect(validator(1)).to.eventually.be.equal(1);
    });
  });
});
