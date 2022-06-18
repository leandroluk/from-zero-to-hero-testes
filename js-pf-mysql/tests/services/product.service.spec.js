const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { productService } = require('../../src/services');
const { productModel } = require('../../src/models');
const { NotFoundError } = require('../../src/errors');

use(chaiAsPromised);

describe('services/product.service', () => {
  beforeEach(sinon.restore);

  // validateParamsId

  // valdateBodyAdd

  // validateBodyEdit

  describe('add', () => {
    it('should rejects if productModel.add throws', () => {
      sinon.stub(productModel, 'add').rejects();
      expect(productService.add({}))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'add').resolves(1);
      expect(productService.add({}))
        .to.eventually.be.equal(1);
    });
  });

  describe('exists', () => {
    it('should rejects if productModel.get throws', () => {
      sinon.stub(productModel, 'get').rejects();
      expect(productService.exists(1))
        .to.eventually.be.rejected;
    });

    it('should rejects if productModel.get return empty', () => {
      sinon.stub(productModel, 'get').resolves();
      expect(productService.exists(1))
        .to.eventually.be.rejectedWith(NotFoundError);
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'get').resolves({});
      expect(productService.exists(1))
        .to.eventually.be.undefined;
    });
  });

  describe('existsByArrayOfId', () => {
    it('should rejects if productModel.listByArrayOfId throws', () => {
      sinon.stub(productModel, 'listByArrayOfId').rejects();
      expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.rejected;
    });

    it('should rejects if productModel.listByArrayOfId return missing item', () => {
      sinon.stub(productModel, 'listByArrayOfId').resolves([{ id: 2 }]);
      expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.rejectedWith(NotFoundError);
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'listByArrayOfId').resolves([{ id: 1 }]);
      expect(productService.existsByArrayOfId([1]))
        .to.eventually.be.undefined;
    });
  });

  describe('edit', () => {
    it('should rejects if productModel.edit', () => {
      sinon.stub(productModel, 'edit').rejects();
      expect(productService.edit(1, {}))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'edit').resolves();
      expect(productService.edit(1, {}))
        .to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should rejects if productModel.remove', () => {
      sinon.stub(productModel, 'remove').rejects();
      expect(productService.remove(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'remove').resolves();
      expect(productService.remove(1))
        .to.eventually.be.undefined;
    });
  });

  describe('get', () => {
    it('should rejects if productModel.get', () => {
      sinon.stub(productModel, 'get').rejects();
      expect(productService.get(1))
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'get').resolves();
      expect(productService.get(1))
        .to.eventually.be.ok;
    });
  });

  describe('list', () => {
    it('should rejects if productModel.list', () => {
      sinon.stub(productModel, 'list').rejects();
      expect(productService.list())
        .to.eventually.be.rejected;
    });

    it('should resolves if success', () => {
      sinon.stub(productModel, 'list').resolves();
      expect(productService.list())
        .to.eventually.be.ok;
    });
  });
});
