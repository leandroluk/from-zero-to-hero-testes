const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../src/db');
const { saleProductModel } = require('../../src/models');

describe('models/sale-product.model', () => {
  beforeEach(sinon.restore);

  describe('bulkAddBySaleId', () => {
    const items = [{
      id: 2,
      description: 'a',
      quantity: 3,
      price: 4.56,
      unit: null,
    }];

    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(saleProductModel.bulkAddBySaleId(1, items))
        .to.eventually.be.rejected;
    });

    it('should resolve undefined if success', () => {
      sinon.stub(db, 'query').resolves();
      return expect(saleProductModel.bulkRemoveBySaleId(1, items))
        .to.eventually.be.undefined;
    });
  });

  describe('bulkRemoveBySaleId', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(saleProductModel.bulkRemoveBySaleId(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves();
      return expect(saleProductModel.bulkRemoveBySaleId(1))
        .to.eventually.be.undefined;
    });
  });

  describe('listBySaleId', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(saleProductModel.listBySaleId(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves([[]]);
      return expect(saleProductModel.listBySaleId(1))
        .to.eventually.be.deep.equal([]);
    });
  });
});
