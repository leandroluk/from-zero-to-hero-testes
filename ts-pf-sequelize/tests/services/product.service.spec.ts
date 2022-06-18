import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'sequelize';
import sinon from 'sinon';
import { NotFoundError } from '../../src/errors';
import { productModel } from '../../src/models';
import { productService } from '../../src/services';
import { Product } from '../../src/types';

use(chaiAsPromised);

describe('services/product.service', () => {
  beforeEach(sinon.restore);

  // validateParamsId

  // valdateBodyAdd

  // validateBodyEdit

  describe('add', () => {
    const addMock = {} as Product.Add;

    it('should rejects if productModel.create throws', () => {
      sinon.stub(productModel, 'create').rejects();
      expect(productService.add(addMock))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'create').resolves();
      expect(productService.add(addMock))
        .to.eventually.be.undefined;
    });
  });

  describe('exists', () => {
    it('should rejects if productModel.findByPk throws', () => {
      sinon.stub(productModel, 'findByPk').rejects();
      expect(productService.exists(1))
        .to.eventually.be.rejected;
    });

    it('should rejects if productModel.findByPk return empty', () => {
      sinon.stub(productModel, 'findByPk').resolves();
      expect(productService.exists(1))
        .to.eventually.be.rejectedWith(NotFoundError);
    });

    it('should resolves if success', () => {
      const mock = {} as Model;
      sinon.stub(productModel, 'findByPk').resolves(mock);
      expect(productService.exists(1))
        .to.eventually.be.undefined;
    });
  });

  describe('existsByArrayOfId', () => {
    it('should rejects if productModel.findAll throws', () => {
      sinon.stub(productModel, 'findAll').rejects();
      expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.rejected;
    });

    it('should rejects if productModel.findAll return missing item', () => {
      sinon.stub(productModel, 'findAll').resolves([]);
      expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.rejectedWith(NotFoundError);
    });

    it('should resolves if success', () => {
      const mock = [{ id: 1 } as unknown as Model];
      sinon.stub(productModel, 'findAll').resolves(mock);
      expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.undefined;
    });
  });

  describe('edit', () => {
    it('should rejects if productModel.update', () => {
      sinon.stub(productModel, 'update').rejects();
      expect(productService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'update').resolves();
      expect(productService.edit(1, {}))
        .to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should rejects if productModel.destroy', () => {
      sinon.stub(productModel, 'destroy').rejects();
      expect(productService.remove(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'destroy').resolves();
      expect(productService.remove(1))
        .to.eventually.be.undefined;
    });
  });

  describe('get', () => {
    it('should rejects if productModel.findByPk', () => {
      sinon.stub(productModel, 'findByPk').rejects();
      expect(productService.get(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'findByPk').resolves();
      expect(productService.get(1))
        .to.eventually.be.ok;
    });
  });

  describe('list', () => {
    it('should rejects if productModel.findAll', () => {
      sinon.stub(productModel, 'findAll').rejects();
      expect(productService.list())
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'findAll').resolves();
      expect(productService.list())
        .to.eventually.be.ok;
    });
  });
});
