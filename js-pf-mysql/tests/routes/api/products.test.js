const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const db = require('../../../src/db');
const {
  invaliParamIdList,
  invalidAddProductList,
  invalidEditProductList,
} = require('../../_mocks/product.mock');

const { expect } = chai;

chai.use(chaiHttp);

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
      sinon.stub(db, 'query').resolves([[]]);
      const url = `${baseUrl}/999`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(404);
    });

    it('should return 204 if remove', async () => {
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]]) //  exists
        .onCall(1).resolves(); //       remove

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
      sinon.stub(db, 'query')
        .onCall(0).resolves([[]]);

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]])
        .onCall(1).resolves()
        .onCall(2).resolves([[{}]]);

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
      sinon.stub(db, 'query').resolves([[]]);
      const url = `${baseUrl}/1`;

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]])
        .onCall(1).resolves([[{}]]);
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
      const mock = { description: 'a', price: 1, unit: 'a' };

      sinon.stub(db, 'query')
        .onCall(0).resolves([[{ insertId: 1 }]])
        .onCall(1).resolves([[{ ...mock, id: 1 }]]);

      const result = await chai
        .request(app)
        .post(baseUrl)
        .send(mock);

      expect(result.status).to.equal(201);
    });
  });

  describe('GET /', () => {
    const baseUrl = '/api/products';

    it('should return 200 with products', async () => {
      sinon.stub(db, 'query').resolves([[]]);

      const result = await chai
        .request(app)
        .get(baseUrl);

      expect(result.status).to.equal(200);
    });
  });
});
