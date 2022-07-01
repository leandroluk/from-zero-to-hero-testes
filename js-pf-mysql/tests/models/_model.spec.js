const { expect } = require('chai');
const {
  camelFields2Snake,
  selectSnakeAsCamel,
} = require('../../src/models/_models');

describe('models/_models', () => {
  describe('camelFields2Snake', () => {
    it('should transform keys from camel case to snake case', () => {
      const FIELDS = { keyA: 'key_a' };
      const obj = { keyA: 1 };
      expect(camelFields2Snake(obj, FIELDS).key_a).to.equal(1);
    });
  });

  describe('selectSnakeAsCamel', () => {
    it('should create select AS pattern', () => {
      const FIELDS = { keyA: 'key_a' };
      expect(selectSnakeAsCamel(FIELDS)).to.equal('`key_a` AS `keyA`');
    });
  });
});
