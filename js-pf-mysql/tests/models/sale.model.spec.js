const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../src/db');
const { saleModel } = require('../../src/models');

use(chaiAsPromised);

describe('models/sale.model', () => {
  beforeEach(sinon.restore);

  describe('add', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      expect(saleModel.add({}))
        .to.eventually.be.rejected;
    });

    it('should return insertId if sucess', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      expect(saleModel.add({}))
        .to.eventually.be.equal(1);
    });
  });

  describe('edit', () => {
    const id = 1;
    const changes = {
      camelCase: 'camelCase',
      otherField: 'otherField',
    };

    it('should interpolate camelCase keys as snake_case keys', async () => {
      const queryStub = sinon.stub(db, 'query').resolves();
      const matcher = 'camel_case = ?,other_field = ?';
      await saleModel.edit(id, changes);
      const { args } = queryStub.getCall(0);
      expect(args[0]).to.includes(matcher);
      expect(args[1]).to.deep.equal(['camelCase', 'otherField', 1]);
    });

    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      expect(saleModel.edit(id, changes))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves();
      expect(saleModel.edit(id, changes))
        .to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      expect(saleModel.remove(0))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves();
      expect(saleModel.remove(0))
        .to.eventually.be.undefined;
    });
  });

  describe('list', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      expect(saleModel.list())
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves([[{ id: 1 }]]);
      expect(saleModel.list())
        .to.eventually.be.deep.equal([{ id: 1 }]);
    });
  });

  describe('get', () => {
    it('should rejects if db throws', () => {
      sinon.stub(db, 'query').rejects();
      expect(saleModel.get(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(db, 'query').resolves([[{ id: 1 }]]);
      expect(saleModel.get(1))
        .to.eventually.be.deep.equal({ id: 1 });
    });
  });
});
