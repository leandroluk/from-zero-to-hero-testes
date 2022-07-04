import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Request } from 'express';
import sinon from 'sinon';
import { productController } from '../../src/controllers';
import { productService } from '../../src/services';
import { makeRes } from './_controllers';

use(chaiAsPromised);

describe('controllers/product.controller', () => {
  beforeEach(sinon.restore);

  const req = {} as Request;

  describe('edit', () => {
    it('should rejects if productService.validateParamsId throws', () => {
      sinon.stub(productService, 'validateParamsId').rejects();
      sinon.stub(productService, 'validateBodyEdit').resolves();
      const res = makeRes();
      return expect(productController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.validateBodyEdit throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').rejects();
      const res = makeRes();
      return expect(productController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.exists throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').rejects();
      const res = makeRes();
      return expect(productController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.edit throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'edit').resolves();
      const res = makeRes();
      return expect(productController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.get throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'edit').resolves();
      sinon.stub(productService, 'get').rejects();
      const res = makeRes();
      return expect(productController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should call json if success', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBodyEdit').resolves();
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'edit').resolves();
      sinon.stub(productService, 'get').resolves();
      const res = makeRes();
      await productController.edit(req, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });

  describe('add', () => {
    it('should rejects if productService.validateBodyAdd throws', () => {
      sinon.stub(productService, 'validateBodyAdd').rejects();
      const res = makeRes();
      return expect(productController.add(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.add throws', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').rejects();
      const res = makeRes();
      return expect(productController.add(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.get throws', () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').resolves();
      sinon.stub(productService, 'get').rejects();
      const res = makeRes();
      return expect(productController.add(req, res))
        .to.eventually.be.rejected;
    });

    it('should send status 201 and call json', async () => {
      sinon.stub(productService, 'validateBodyAdd').resolves();
      sinon.stub(productService, 'add').resolves();
      sinon.stub(productService, 'get').resolves();
      const res = makeRes();
      await productController.add(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(201);
      expect(res.json.getCall(0)).to.ok;
    });
  });

  describe('remove', () => {
    it('should rejects if productService.validateParamsId throws', () => {
      sinon.stub(productService, 'validateParamsId').rejects();
      const res = makeRes();
      return expect(productController.remove(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.exists throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').rejects();
      const res = makeRes();
      return expect(productController.remove(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.remove throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'remove').rejects();
      const res = makeRes();
      return expect(productController.remove(req, res))
        .to.eventually.be.rejected;
    });

    it('should response with status 204 if success', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'remove').resolves();
      const res = makeRes();
      await productController.remove(req, res);
      expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });

  describe('get', () => {
    it('should rejects if productService.validateParamsId throws', () => {
      sinon.stub(productService, 'validateParamsId').rejects();
      const res = makeRes();
      return expect(productController.get(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.exists throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').rejects();
      const res = makeRes();
      return expect(productController.get(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if productService.get throws', () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'get').rejects();
      const res = makeRes();
      return expect(productController.get(req, res))
        .to.eventually.be.rejected;
    });

    it('should call json if success', async () => {
      sinon.stub(productService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(productService, 'get').resolves();
      const res = makeRes();
      await productController.get(req, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });

  describe('list', () => {
    it('should rejects if productService.list throws', () => {
      sinon.stub(productService, 'list').rejects();
      const res = makeRes();
      return expect(productController.list(req, res))
        .to.eventually.be.rejected;
    });

    it('should call json if success', async () => {
      sinon.stub(productService, 'list').resolves();
      const res = makeRes();
      await productController.list(req, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });
});
