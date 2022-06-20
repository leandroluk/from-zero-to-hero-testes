const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const db = require('../../../src/db');
const {
  invaliParamIdList,
  invalidAddSaleList,
  invalidEditSaleList,
} = require('../../_mocks/sale.mock');

const { expect } = chai;

chai.use(chaiHttp);

describe('routes/api/sales', () => {
  beforeEach(sinon.restore);

  describe('DELETE /:id', () => {
    const baseUrl = '/api/sales';

    invaliParamIdList.forEach((invalid) => {
      it(`should return 400 if param id is "${invalid}"(invalid)`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai
          .request(app)
          .delete(url);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if sale not found', async () => {
      sinon.stub(db, 'query')
        .onCall(0).resolves([[]]);
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
    const baseUrl = '/api/sales';

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

    invalidEditSaleList.forEach((invalid) => {
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
      sinon.stub(db, 'query').resolves([[]]);

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]]) //  saleModel.exists
        .onCall(1).resolves() //        saleModel.edit
        .onCall(2).resolves() //        saleProductModel.bulkRemoveBySaleId
        .onCall(3).resolves() //        saleProductModel.bulkAddBySaleId
        .onCall(4).resolves([[{}]]) //  saleModel.get
        .onCall(5).resolves([[]]); //   saleProductModel.listBySaleId

      const result = await chai
        .request(app)
        .put(url)
        .send({
          products: [{
            id: 1,
            description: 'a',
            quantity: 1,
            price: 1,
            unit: 'a',
          }],
        });

      expect(result.status).to.equal(200);
    });
  });

  describe('GET /:id', () => {
    const baseUrl = '/api/sales';

    invaliParamIdList.forEach((invalid) => {
      it(`should return 400 if param ${invalid} is invalid`, async () => {
        const url = `${baseUrl}/${invalid}`;

        const result = await chai
          .request(app)
          .get(url);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 404 if not found', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(db, 'query').resolves([[]]);

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(db, 'query')
        .onCall(0).resolves([[{}]]) // saleService.exists ~> saleModel.get
        .onCall(1).resolves([[{}]]) // saleService.get ~> saleModel.get
        .onCall(2).resolves([[]]); // saleProductModel.listBySaleId

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(200);
    });
  });

  describe('POST /', () => {
    const baseUrl = '/api/sales';

    invalidAddSaleList.forEach((invalid) => {
      it(`should return 400 if body ${JSON.stringify(invalid)} is invalid`, async () => {
        const result = await chai
          .request(app)
          .post(baseUrl)
          .send(invalid);

        expect(result.status).to.equal(400);
      });
    });

    it('should return 201 if success', async () => {
      const saleMock = {
        sellerName: 'a',
        purchaserName: 'a',
      };
      const productMock = {
        id: 1,
        description: 'a',
        quantity: 1,
        price: 1,
        unit: 'a',
      };
      sinon.stub(db, 'query')
        // productService.existsByArrayOfId ~> productModel.listByArrayOfId
        .onCall(0).resolves([[{ id: 1 }]])
        // saleService.add ~> saleModel.add
        .onCall(1).resolves([[{ insertId: 1 }]])
        // saleService.add ~> saleProductModel.bulkAddBySaleId
        .onCall(2).resolves()
        // saleService.get ~> saleModel.get
        .onCall(3).resolves([[{}]])
        // saleService.get ~> saleProductModel.listBySaleId
        .onCall(4).resolves([[]]);
      const result = await chai
        .request(app)
        .post(baseUrl)
        .send({ ...saleMock, products: [productMock] });
      expect(result.status).to.equal(201);
    });
  });

  describe('GET /', () => {
    const baseUrl = '/api/sales';
    it('should return 200 if sccess', async () => {
      sinon.stub(db, 'query').resolves([[]]);
      const result = await chai
        .request(app)
        .get(baseUrl);

      expect(result.status).to.equal(200);
    });
  });
});
