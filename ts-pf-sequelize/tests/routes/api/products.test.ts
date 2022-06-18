import chai from 'chai';
import chaiHttp from 'chai-http';
import { Model } from 'sequelize';
import sinon from 'sinon';
import app from '../../../src/app';
import { productModel } from '../../../src/models';

const { expect } = chai;

chai.use(chaiHttp);

const invaliParamIdList = [
  'a',
  '-1',
  '0',
  '1.1',
];

const invalidEditProductList = [
  {
    description: 1,
  }, // invalid "description" number
  {
    description: true,
  }, // invalid "description" boolean
  {
    price: 'a',
  }, // invalid "price" string
  {
    price: true,
  }, // invalid "price" boolean
  {
    unit: 1,
  }, // invalid "unit" number
  {
    unit: true,
  }, // invalid "unit" boolean
];

const invalidAddProductList = [
  {
    price: 1, unit: 'a',
  }, // missing "description"
  {
    description: 'a', unit: 'a',
  }, // missing "price"
  {
    description: 'a', price: 1,
  }, // missing "unit"
  {
    description: 1, price: 1, unit: 'a',
  }, // invalid "description" (number)
  {
    description: true, price: 1, unit: 'a',
  }, // invalid "description" (boolean)
  {
    description: 'a', price: 'a', unit: 'a',
  }, // invalid "price" (string)
  {
    description: 'a', price: true, unit: 'a',
  }, // invalid "price" (boolean)
  {
    description: 'a', price: 1, unit: 1,
  }, // invalid "unit" (number)
  {
    description: 'a', price: 1, unit: true,
  }, // invalid "unit" (boolean)
];

describe('routes/api/products', () => {
  beforeEach(sinon.restore);

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
      sinon.stub(productModel, 'findByPk').resolves();
      const url = `${baseUrl}/999`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(404);
    });

    it('should return 204 if remove', async () => {
      sinon.stub(productModel, 'findByPk').resolves({} as Model);
      sinon.stub(productModel, 'destroy').resolves();

      const url = `${baseUrl}/1`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(204);
    });
  });

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
      sinon.stub(productModel, 'findByPk').resolves();

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      const mock = { toJSON: () => ({}) } as Model;
      sinon.stub(productModel, 'findByPk').resolves(mock);
      sinon.stub(productModel, 'update').resolves();

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(200);
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
      sinon.stub(productModel, 'findByPk').resolves();

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const mock = { toJSON: () => ({}) } as Model;
      sinon.stub(productModel, 'findByPk').resolves(mock);
      const url = `${baseUrl}/1`;

      const result = await chai
        .request(app)
        .get(url);

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
      const mock = { toJSON: () => ({}) } as Model;

      sinon.stub(productModel, 'create').resolves(mock);
      sinon.stub(productModel, 'findByPk').resolves(mock);

      const result = await chai
        .request(app)
        .post(baseUrl)
        .send({ description: 'a', price: 1, unit: 'a' });

      expect(result.status).to.equal(201);
    });
  });

  describe('GET /', () => {
    const baseUrl = '/api/products';

    it('should return 200 with products', async () => {
      sinon.stub(productModel, 'findAll').resolves([]);

      const result = await chai
        .request(app)
        .get(baseUrl);

      expect(result.status).to.equal(200);
    });
  });
});
