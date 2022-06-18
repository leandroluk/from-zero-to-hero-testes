const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const db = require('../../../src/db');

const { expect } = chai;

chai.use(chaiHttp);

const invaliParamIdList = [
  'a',
  '-1',
  '0',
  '1.1',
];

describe('routes/api/products', () => {
  beforeEach(sinon.restore);

  describe('DELETE /:id', () => {
    const baseUrl = '/api/products';

    invaliParamIdList.forEach((invalid) => {
      it(`should return 400 if param id is "${invalid}"(invalid)`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai.request(app).delete(url);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if product not found', async () => {
      sinon.stub(db, 'query')
        .onCall(0).resolves([[]]);
      const url = `${baseUrl}/999`;

      const result = await chai.request(app).delete(url);

      expect(result.status).to.equal(404);
    });

    it('should return 204 if remove', async () => {
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]]) //  exists
        .onCall(1).resolves(); //       remove

      const url = `${baseUrl}/1`;

      const result = await chai.request(app).delete(url);

      expect(result.status).to.equal(204);
    });
  });

  describe('PUT /:id', () => {
    const baseUrl = '/api/products';

    invaliParamIdList.forEach((invalid) => {
      it(`should return 400 if param ${invalid} is invalid`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai.request(app).put(url).send({});

        expect(result.status).to.equal(400);
      });
    });

    [
      { description: 1 }, // invalid "description" number
      { description: true }, // invalid "description" boolean
      { price: 'a' }, // invalid "price" string
      { price: true }, // invalid "price" boolean
      { unit: 1 }, // invalid "unit" number
      { unit: true }, // invalid "unit" boolean
    ].forEach((invalid) => {
      it(`should return 400 if body ${JSON.stringify(invalid)} is invalid`, async () => {
        const url = `${baseUrl}/1`;

        const result = await chai.request(app).put(url).send(invalid);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if not found', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(db, 'query')
        .onCall(0).resolves([[]]);

      const result = await chai.request(app).put(url).send({});

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]])
        .onCall(1).resolves()
        .onCall(2).resolves([[{}]]);

      const result = await chai.request(app).put(url).send({});

      expect(result.status).to.equal(200);
    });
  });

  describe('GET /:id', () => {
    const baseUrl = '/api/products';

    invaliParamIdList.forEach((invalid) => {
      it(`should throw if param ${invalid} is invalid`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai.request(app).get(url);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if not found', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const url = `${baseUrl}/1`;

      const result = await chai.request(app).get(url);

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]])
        .onCall(1).resolves([[{}]]);
      const url = `${baseUrl}/1`;

      const result = await chai.request(app).get(url);

      expect(result.status).to.equal(200);
    });
  });

  describe('POST /', () => {
    const baseUrl = '/api/products';

    [
      { price: 1, unit: 'a' }, // missing "description"
      { description: 'a', unit: 'a' }, // missing "price"
      { description: 'a', price: 1 }, // missing "unit"
      { description: 1, price: 1, unit: 'a' }, // invalid "description" (number)
      { description: true, price: 1, unit: 'a' }, // invalid "description" (boolean)
      { description: 'a', price: 'a', unit: 'a' }, // invalid "price" (string)
      { description: 'a', price: true, unit: 'a' }, // invalid "price" (boolean)
      { description: 'a', price: 1, unit: 1 }, // invalid "unit" (number)
      { description: 'a', price: 1, unit: true }, // invalid "unit" (boolean)
    ].forEach((invalid) => {
      it(`should return 400 if body ${JSON.stringify(invalid)} is invalid`, async () => {
        const result = await chai.request(app).post(baseUrl).send(invalid);

        expect(result.status).to.equal(400);
      });
    });
  });

  describe('GET /', () => {
    const baseUrl = '/api/products';

    it('should return 200 with products', async () => {
      const result = await chai.request(app).get(baseUrl);

      expect(result.status).to.equal(200);
    });
  });
});
