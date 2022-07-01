const { expect } = require('chai');
const {
  objToKeyValues,
  snake2camel,
  camel2snake,
} = require('../../src/models/_models');

describe('models/_models', () => {
  describe('objToKeyValues', () => {
    it('should return a tuple with array of keys and array of values', () => {
      const value = { foo: 1, bar: 'test', bin: true };
      const expected = [['foo', 'bar', 'bin'], [1, 'test', true]];
      const result = objToKeyValues(value);
      expect(result).to.deep.equal(expected);
    });
  });

  describe('snake2camel', () => {
    it('should transform snake case to camel case', () => {
      const value = 'snake_case';
      const expected = 'snakeCase';
      const result = snake2camel(value);
      expect(result).to.equal(expected);
    });
  });

  describe('camel2snake', () => {
    it('should transform camel case to snake case', () => {
      const value = 'camelCase';
      const expected = 'camel_case';
      const result = camel2snake(value);
      expect(result).to.equal(expected);
    });
  });
});
