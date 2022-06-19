import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'sequelize';
import sinon from 'sinon';
import { NotFoundError } from '../../src/errors';
import {
  saleModel,
  saleProductModel
} from '../../src/models';
import { saleService } from '../../src/services';
import { Sale } from '../../src/types';

use(chaiAsPromised);

describe('services/sale.service', () => {
  beforeEach(sinon.restore);

  // validateParamsId

  // validateBodyAdd

  // validateBodyEdit

  describe('add', () => {
    const addMock = {} as Sale.Add;

    it('should rejects if saleModel.create throws', () => {
      sinon.stub(saleModel, 'create').rejects();
      expect(saleService.add(addMock))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.bulkCreate throws', () => {
      sinon.stub(saleModel, 'create').resolves({} as Model);
      sinon.stub(saleProductModel, 'bulkCreate').rejects();
      expect(saleService.add(addMock))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'create').resolves({} as Model);
      sinon.stub(saleProductModel, 'bulkCreate').resolves();
      expect(saleService.add(addMock))
        .to.eventually.be.equal(1);
    });
  });

  describe('edit', () => {
    it('should rejects if saleModel.update throws', () => {
      sinon.stub(saleModel, 'update').rejects();
      expect(saleService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.destroy throws', () => {
      sinon.stub(saleModel, 'update').resolves();
      sinon.stub(saleProductModel, 'destroy').rejects();
      expect(saleService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.bulkCreate throws', () => {
      sinon.stub(saleModel, 'update').resolves();
      sinon.stub(saleProductModel, 'destroy').resolves();
      sinon.stub(saleProductModel, 'bulkCreate').rejects();
      expect(saleService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'update').resolves();
      sinon.stub(saleProductModel, 'destroy').resolves();
      sinon.stub(saleProductModel, 'bulkCreate').resolves();
      expect(saleService.edit(1, {}))
        .to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should rejects if saleModel.destroy throws', () => {
      sinon.stub(saleModel, 'destroy').rejects();
      expect(saleService.remove(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'destroy').resolves();
      expect(saleService.remove(1))
        .to.eventually.be.undefined;
    });
  });

  describe('exists', () => {
    it('should rejects if saleModel.findByPk throws', () => {
      sinon.stub(saleModel, 'findByPk').rejects();
      expect(saleService.exists(1))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleModel.findByPk return empty', () => {
      sinon.stub(saleModel, 'findByPk').resolves();
      expect(saleService.exists(1))
        .to.eventually.be.rejectedWith(NotFoundError, '"sale" not found.');
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'findByPk').resolves({} as Model);
      expect(saleService.exists(1))
        .to.eventually.be.undefined;
    });
  });

  describe('get', () => {
    const mock = { toJSON: () => ({}) } as unknown as Model;

    it('should rejects if saleModel.findByPk throws', () => {
      sinon.stub(saleModel, 'findByPk').rejects();
      expect(saleService.get(1))
        .to.eventually.be.rejected;
    });

    it('should rejects if saleProductModel.findAll throws', () => {
      sinon.stub(saleModel, 'findByPk').resolves(mock);
      sinon.stub(saleProductModel, 'findAll').rejects();
      expect(saleService.get(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'findByPk').resolves(mock);
      sinon.stub(saleProductModel, 'findAll').resolves([]);
      expect(saleService.get(1))
        .to.eventually.be.deep.equal({ products: [] });
    });
  });

  describe('list', () => {
    it('should rejects if saleModel.findAll throws', () => {
      sinon.stub(saleModel, 'findAll').rejects();
      expect(saleService.list())
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(saleModel, 'findAll').resolves([]);
      expect(saleService.list())
        .to.eventually.be.deep.equal([]);
    });
  });
});
