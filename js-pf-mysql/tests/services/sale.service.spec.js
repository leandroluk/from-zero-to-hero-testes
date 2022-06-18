const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { saleService } = require('../../src/services');
const { saleModel, saleProductModel } = require('../../src/models');

use(chaiAsPromised);

describe('services/sale.service', () => {
  beforeEach(sinon.restore);

  // validateParamsId

  // validateBodyAdd

  // validateBodyEdit

  describe('add', () => {
    it('should rejects if saleModel.add throws', () => {
      sinon.stub(saleModel, 'add').rejects();
      expect(saleService.add({}))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.bulkAddBySaleId throws', () => {
      sinon.stub(saleModel, 'add').resolves();
      sinon.stub(saleProductModel, 'bulkAddBySaleId').rejects();
      expect(saleService.add({}))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'add').resolves(1);
      sinon.stub(saleProductModel, 'bulkAddBySaleId').resolves();
      expect(saleService.add({}))
        .to.eventually.be.equal(1);
    });
  });

  describe('exists', () => {
    it('should rejects if saleModel.get throws', () => {
      sinon.stub(saleModel, 'get').rejects();
      expect(saleService.exists(1))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleModel.get return empty', () => {
      sinon.stub(saleModel, 'get').resolves();
      expect(saleService.exists(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'get').resolves({});
      expect(saleService.exists(1))
        .to.eventually.be.undefined;
    });
  });

  describe('edit', () => {
    it('should rejects if saleModel.edit throws', () => {
      sinon.stub(saleModel, 'edit').rejects();
      expect(saleService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.bulkRemoveBySaleId throws', () => {
      sinon.stub(saleModel, 'edit').resolves();
      sinon.stub(saleProductModel, 'bulkRemoveBySaleId').rejects();
      expect(saleService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.bulkAddBySaleId throws', () => {
      sinon.stub(saleModel, 'edit').resolves();
      sinon.stub(saleProductModel, 'bulkRemoveBySaleId').resolves();
      sinon.stub(saleProductModel, 'bulkAddBySaleId').rejects();
      expect(saleService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'edit').resolves();
      sinon.stub(saleProductModel, 'bulkRemoveBySaleId').resolves();
      sinon.stub(saleProductModel, 'bulkAddBySaleId').resolves();
      expect(saleService.edit(1, {}))
        .to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should rejects if saleModel.remove throws', () => {
      sinon.stub(saleModel, 'remove').rejects();
      expect(saleService.remove(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'remove').resolves();
      expect(saleService.remove(1))
        .to.eventually.be.undefined;
    });
  });

  describe('get', () => {
    it('should rejects if saleModel.get throws', () => {
      sinon.stub(saleModel, 'get').rejects();
      expect(saleService.get(1))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.listBySaleId throws', () => {
      sinon.stub(saleModel, 'get').resolves({});
      sinon.stub(saleProductModel, 'listBySaleId').rejects();
      expect(saleService.get(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'get').resolves({});
      sinon.stub(saleProductModel, 'listBySaleId').resolves([]);
      expect(saleService.get(1))
        .to.eventually.be.deep.equal({ products: [] });
    });
  });

  describe('list', () => {
    it('should rejects if saleModel.list throws', () => {
      sinon.stub(saleModel, 'list').rejects();
      expect(saleService.list())
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'list').resolves([]);
      expect(saleService.list())
        .to.eventually.be.deep.equal([]);
    });
  });
});
