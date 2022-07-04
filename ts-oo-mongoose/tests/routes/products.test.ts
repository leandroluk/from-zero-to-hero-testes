import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import { productModel } from '../../src/models';
import {
  invalidAddProductList,
  invalidEditProductList,
  invaliParamIdList
} from '../_mocks/product.mock';

const { expect } = chai;

chai.use(chaiHttp);

describe('routes/api/products', () => {
  beforeEach(sinon.restore);

  describe('PUT /:id', () => {
    const baseUrl = '/api/products';

    invaliParamIdList.forEach((invalid) => {
      it(`should return 400 if param ${invalid} is invalid`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai
          .request(app)
          .put(url)
          .send({});

        expect(result.status).to.equal(400);
      });
    });

    invalidEditProductList.forEach((invalid) => {
      it(`should return 400 if body ${JSON.stringify(invalid)} is invalid`, async () => {
        const url = `${baseUrl}/1`;

        const result = await chai
          .request(app)
          .put(url)
          .send(invalid);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if not found', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(productModel, 'findOne').resolves();

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(productModel, 'findOne').resolves({});
      sinon.stub(productModel, 'update').resolves();

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(200);
    });
  });

  describe('POST /', () => {
    const baseUrl = '/api/products';

    invalidAddProductList.forEach((invalid) => {
      it(`should return 400 if body ${JSON.stringify(invalid)} is invalid`, async () => {
        const result = await chai
          .request(app)
          .post(baseUrl)
          .send(invalid);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 201 with created product', async () => {
      sinon.stub(productModel, 'create').resolves({});
      sinon.stub(productModel, 'findOne').resolves({});

      const result = await chai
        .request(app)
        .post(baseUrl)
        .send({ description: 'a', price: 1, unit: 'a' });

      expect(result.status).to.equal(201);
    });
  });

  describe('DELETE /:id', () => {
    const baseUrl = '/api/products';

    invaliParamIdList.forEach((invalid) => {
      it(`should return 400 if param id is "${invalid}"(invalid)`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai
          .request(app)
          .delete(url);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if product not found', async () => {
      sinon.stub(productModel, 'findOne').resolves();
      const url = `${baseUrl}/999`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(404);
    });

    it('should return 204 if remove', async () => {
      sinon.stub(productModel, 'findOne').resolves({});
      sinon.stub(productModel, 'deleteOne').resolves();

      const url = `${baseUrl}/1`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(204);
    });
  });

  describe('GET /:id', () => {
    const baseUrl = '/api/products';

    invaliParamIdList.forEach((invalid) => {
      it(`should throw if param ${invalid} is invalid`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai
          .request(app)
          .get(url);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if not found', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(productModel, 'findOne').resolves();

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      sinon.stub(productModel, 'findOne').resolves({});
      const url = `${baseUrl}/1`;

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(200);
    });
  });

  describe('GET /', () => {
    const baseUrl = '/api/products';

    it('should return 200 with products', async () => {
      sinon.stub(productModel, 'find').resolves([]);

      const result = await chai
        .request(app)
        .get(baseUrl);

      expect(result.status).to.equal(200);
    });
  });
});
