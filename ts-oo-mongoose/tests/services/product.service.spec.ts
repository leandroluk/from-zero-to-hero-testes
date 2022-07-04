import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'sequelize';
import sinon from 'sinon';
import { NotFoundError } from '../../src/errors';
import { productModel } from '../../src/models';
import { productService } from '../../src/services';
import { AddProduct } from '../../src/types';

use(chaiAsPromised);

describe('services/product.service', () => {
  beforeEach(sinon.restore);

  // validateParamsId

  // valdateBodyAdd

  // validateBodyEdit

  describe('existsByArrayOfId', () => {
    it('should rejects if productModel.findAll throws', () => {
      sinon.stub(productModel, 'findAll').rejects();
      return expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.rejected;
    });

    it('should rejects if productModel.findAll return missing item', () => {
      sinon.stub(productModel, 'findAll').resolves([]);
      return expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.rejectedWith(NotFoundError, '"product[0]" not found.');
    });

    it('should resolves if success', () => {
      const mock = [{ id: 1 } as Model];
      sinon.stub(productModel, 'findAll').resolves(mock);
      return expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.undefined;
    });
  });

  describe('exists', () => {
    it('should rejects if productModel.findByPk throws', () => {
      sinon.stub(productModel, 'findByPk').rejects();
      return expect(productService.exists(1))
        .to.eventually.be.rejected;
    });

    it('should rejects if productModel.findByPk return empty', () => {
      sinon.stub(productModel, 'findByPk').resolves();
      return expect(productService.exists(1))
        .to.eventually.be.rejectedWith(NotFoundError, '"product" not found.');
    });

    it('should resolves if success', () => {
      const mock = {} as Model;
      sinon.stub(productModel, 'findByPk').resolves(mock);
      return expect(productService.exists(1))
        .to.eventually.be.undefined;
    });
  });

  describe('edit', () => {
    it('should rejects if productModel.update', () => {
      sinon.stub(productModel, 'update').rejects();
      return expect(productService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'update').resolves();
      return expect(productService.edit(1, {}))
        .to.eventually.be.undefined;
    });
  });

  describe('add', () => {
    const addMock = {} as AddProduct;

    it('should rejects if productModel.create throws', () => {
      sinon.stub(productModel, 'create').rejects();
      return expect(productService.add(addMock))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      const mock = { id: 1 } as Model;
      sinon.stub(productModel, 'create').resolves(mock);
      return expect(productService.add(addMock))
        .to.eventually.equal(1);
    });
  });

  describe('remove', () => {
    it('should rejects if productModel.destroy', () => {
      sinon.stub(productModel, 'destroy').rejects();
      return expect(productService.remove(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'destroy').resolves();
      return expect(productService.remove(1))
        .to.eventually.be.undefined;
    });
  });

  describe('get', () => {
    it('should rejects if productModel.findByPk', () => {
      sinon.stub(productModel, 'findByPk').rejects();
      return expect(productService.get(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      const mock = {} as Model;
      sinon.stub(productModel, 'findByPk').resolves(mock);
      return expect(productService.get(1))
        .to.eventually.be.ok;
    });
  });

  describe('list', () => {
    it('should rejects if productModel.findAll', () => {
      sinon.stub(productModel, 'findAll').rejects();
      return expect(productService.list())
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'findAll').resolves([]);
      return expect(productService.list())
        .to.eventually.be.ok;
    });
  });
});
