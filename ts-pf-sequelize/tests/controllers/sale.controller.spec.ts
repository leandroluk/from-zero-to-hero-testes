import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Request } from 'express';
import sinon from 'sinon';
import { saleController } from '../../src/controllers';
import { productService, saleService } from '../../src/services';
import { Sale } from '../../src/types';
import { makeRes } from './_controllers';

use(chaiAsPromised);

describe('controllers/sale.controller', () => {
  beforeEach(sinon.restore);

  const req = {} as Request;

  describe('remove', () => {
    it('should rejects if saleService.validateParamsId throw', () => {
      sinon.stub(saleService, 'validateParamsId').rejects();
      const res = makeRes();
      expect(saleController.remove(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.exists throw', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'exists').rejects();
      const res = makeRes();
      expect(saleController.remove(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.remove throw', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'exists').resolves();
      sinon.stub(saleService, 'remove').rejects();
      const res = makeRes();
      expect(saleController.remove(req, res))
        .to.eventually.be.rejected;
    });

    it('should resolve if success', async () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'exists').resolves();
      sinon.stub(saleService, 'remove').resolves();
      const res = makeRes();
      await saleController.remove(req, res);
      expect(res.sendStatus.getCall(0)).to.be.ok;
    });
  });

  describe('edit', () => {
    it('should rejects if saleService.validateParamsId throws', () => {
      sinon.stub(saleService, 'validateParamsId').rejects();
      sinon.stub(saleService, 'validateBodyEdit').resolves();
      const res = makeRes();
      expect(saleController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.validateBodyEdit throws', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'validateBodyEdit').rejects();
      const res = makeRes();
      expect(saleController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.exists throws', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'validateBodyEdit').resolves();
      sinon.stub(saleService, 'exists').rejects();
      const res = makeRes();
      expect(saleController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.edit throws', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'validateBodyEdit').resolves();
      sinon.stub(saleService, 'exists').resolves();
      sinon.stub(saleService, 'edit').rejects();
      const res = makeRes();
      expect(saleController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.get throws', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'validateBodyEdit').resolves();
      sinon.stub(saleService, 'exists').resolves();
      sinon.stub(saleService, 'edit').resolves();
      sinon.stub(saleService, 'get').rejects();
      const res = makeRes();
      expect(saleController.edit(req, res))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', async () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'validateBodyEdit').resolves();
      sinon.stub(saleService, 'exists').resolves();
      sinon.stub(saleService, 'edit').resolves();
      sinon.stub(saleService, 'get').resolves();
      const res = makeRes();
      await saleController.edit(req, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });

  describe('get', () => {
    it('should rejects if saleService.validateParamsId throws', () => {
      sinon.stub(saleService, 'validateParamsId').rejects();
      const res = makeRes();
      expect(saleController.get(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.exists throws', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'exists').rejects();
      const res = makeRes();
      expect(saleController.get(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.get throws', () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'exists').resolves();
      sinon.stub(saleService, 'get').rejects();
      const res = makeRes();
      expect(saleController.get(req, res))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', async () => {
      sinon.stub(saleService, 'validateParamsId').resolves({ id: 1 });
      sinon.stub(saleService, 'exists').resolves();
      sinon.stub(saleService, 'get').resolves();
      const res = makeRes();
      await saleController.get(req, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });

  describe('add', () => {
    const mock = { products: [] } as unknown as Sale.Add;

    it('should rejects if saleService.validateBodyAdd throws', () => {
      sinon.stub(saleService, 'validateBodyAdd').rejects();
      const res = makeRes();
      expect(saleController.add(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.existsByArrayOfId throws', () => {
      sinon.stub(saleService, 'validateBodyAdd').resolves(mock);
      sinon.stub(productService, 'existsByArrayOfId').rejects();
      const res = makeRes();
      expect(saleController.add(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.add throws', () => {
      sinon.stub(saleService, 'validateBodyAdd').resolves(mock);
      sinon.stub(productService, 'existsByArrayOfId').resolves();
      sinon.stub(saleService, 'add').rejects();
      const res = makeRes();
      expect(saleController.add(req, res))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleService.get throws', () => {
      sinon.stub(saleService, 'validateBodyAdd').resolves(mock);
      sinon.stub(productService, 'existsByArrayOfId').resolves();
      sinon.stub(saleService, 'add').resolves();
      sinon.stub(saleService, 'get').rejects();
      const res = makeRes();
      expect(saleController.add(req, res))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', async () => {
      sinon.stub(saleService, 'validateBodyAdd').resolves(mock);
      sinon.stub(productService, 'existsByArrayOfId').resolves();
      sinon.stub(saleService, 'add').resolves();
      sinon.stub(saleService, 'get').resolves();
      const res = makeRes();
      await saleController.add(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(201);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });

  describe('list', () => {
    it('should rejects if saleService.list throws', () => {
      sinon.stub(saleService, 'list').rejects();
      const res = makeRes();
      expect(saleController.list(req, res))
        .to.eventually.be.rejected;
    });

    it('should resolve if success', async () => {
      sinon.stub(saleService, 'list').resolves();
      const res = makeRes();
      await saleController.list(req, res);
      expect(res.json.getCall(0)).to.be.ok;
    });
  });
});
