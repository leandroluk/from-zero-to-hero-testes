const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { productService } = require('../../src/services');
const { productController } = require('../../src/controllers');
const { makeRes } = require('./_controllers');

use(chaiAsPromised);

describe('controllers/product.controller', () => {
  beforeEach(sinon.restore);

  describe('remove', () => {
    it('should rejects if productService.validateParamsId throws', () => {
      sinon.stub(productService, 'validateParamsId').rejects();
      const res = makeRes();
      return expect(productController.remove({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.exists throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').rejects();
      const res = makeRes();
      return expect(productController.remove({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.remove throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'remove').rejects();
      const res = makeRes();
      return expect(productController.remove({}, res))
        .to.eventually.be.rejected;
    });

    it('should response with status 204 if success', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'remove').resolves();
      const res = makeRes();
      await productController.remove({}, res);
      expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });

  describe('edit', () => {
    it('should rejects if productService.validateParamsId throws', () => {
      sinon.stub(productService, 'validateParamsId').rejects();
      sinon.stub(productService, 'validateBodyEdit').resolves();
      const res = makeRes();
      return expect(productController.edit({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.validateBodyEdit throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').rejects();
      const res = makeRes();
      return expect(productController.edit({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.exists throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').rejects();
      const res = makeRes();
      return expect(productController.edit({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.edit throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'edit').resolves();
      const res = makeRes();
      return expect(productController.edit({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.get throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'edit').resolves();
      sinon.stub(productService, 'get').rejects();
      const res = makeRes();
      return expect(productController.edit({}, res))
        .to.eventually.be.rejected;
    });

    it('should call json if success', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'edit').resolves();
      sinon.stub(productService, 'get').resolves();
      const res = makeRes();
      await productController.edit({}, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });

  describe('get', () => {
    it('should rejects if productService.validateParamsId throws', () => {
      sinon.stub(productService, 'validateParamsId').rejects();
      const res = makeRes();
      return expect(productController.get({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.exists throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').rejects();
      const res = makeRes();
      return expect(productController.get({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.get throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'get').rejects();
      const res = makeRes();
      return expect(productController.get({}, res))
        .to.eventually.be.rejected;
    });

    it('should call json if success', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'get').resolves();
      const res = makeRes();
      await productController.get({}, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });

  describe('add', () => {
    it('should rejects if productService.validateBodyAdd throws', () => {
      sinon.stub(productService, 'validateBodyAdd').rejects();
      const res = makeRes();
      return expect(productController.add({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.add throws', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').rejects();
      const res = makeRes();
      return expect(productController.add({}, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.get throws', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').resolves();
      sinon.stub(productService, 'get').rejects();
      const res = makeRes();
      return expect(productController.add({}, res))
        .to.eventually.be.rejected;
    });

    it('should send status 201 and call json', async () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').resolves();
      sinon.stub(productService, 'get').resolves();
      const res = makeRes();
      await productController.add({}, res);
      expect(res.status.getCall(0).args[0]).to.equal(201);
      expect(res.json.getCall(0)).to.ok;
    });
  });

  describe('list', () => {
    it('should rejects if productService.list throws', () => {
      sinon.stub(productService, 'list').rejects();
      const res = makeRes();
      return expect(productController.list({}, res))
        .to.eventually.be.rejected;
    });

    it('should call json if success', async () => {
      sinon.stub(productService, 'list').resolves();
      const res = makeRes();
      await productController.list({}, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });
});
