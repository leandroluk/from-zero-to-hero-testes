const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../src/db');
const { productModel } = require('../../src/models');

use(chaiAsPromised);

describe('models/product.model', () => {
  beforeEach(sinon.restore);

  describe('add', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productModel.add({}))
        .to.eventually.be.rejected;
    });

    it('should return insertId if sucess', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      return expect(productModel.add({}))
        .to.eventually.be.equal(1);
    });
  });

  describe('edit', () => {
    const id = 1;
    const changes = {
      camelCase: 'camelCase',
      otherField: 'otherField',
    };

    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productModel.edit(id, changes))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves();
      return expect(productModel.edit(id, changes))
        .to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productModel.remove(0))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves();
      return expect(productModel.remove(0))
        .to.eventually.be.undefined;
    });
  });

  describe('list', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productModel.list())
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves([[{ id: 1 }]]);
      return expect(productModel.list())
        .to.eventually.be.deep.equal([{ id: 1 }]);
    });
  });

  describe('listByArrayOfId', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productModel.listByArrayOfId([]))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves([[{ id: 1 }]]);
      return expect(productModel.listByArrayOfId([]))
        .to.eventually.deep.equal([{ id: 1 }]);
    });
  });

  describe('get', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      return expect(productModel.get(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves([[{ id: 1 }]]);
      return expect(productModel.get(1))
        .to.eventually.be.deep.equal({ id: 1 });
    });
  });
});
