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

    [
      {
        sellerName: 1,
      }, // invalid "sellerName" number
      {
        sellerName: true,
      }, // invalid "sellerName" boolean
      {
        sellerName: Array.from(101).fill('0').join(''),
      }, // invalid "sellerName" max 100
      {
        purchaserName: 1,
      }, // invalid "purchaserName" number
      {
        purchaserName: true,
      }, // invalid "purchaserName" boolean
      {
        purchaserName: Array.from(101).fill('0').join(''),
      }, // invalid "purchaserName" max 100
      {
        products: 'a',
      }, // invalid "products" string
      {
        products: 1,
      }, // invalid "products" number
      {
        products: true,
      }, // invalid "products" number
      {
        products: {},
      }, // invalid "products" array
      {
        products: [],
      }, // invalid "products" min 1
      {
        products: ['a'],
      }, // invalid "products[0]" string
      {
        products: [1],
      }, // invalid "products[0]" number
      {
        products: [true],
      }, // invalid "products[0]" number
      {
        products: [{ description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // missing "products[0].id"
      {
        products: [{ id: 1, quantity: 1, price: 1, unit: 'a' }],
      }, // missing "products[0].description"
      {
        products: [{ id: 1, description: 'a', price: 1, unit: 'a' }],
      }, // missing "products[0].quantity"
      {
        products: [{ id: 1, description: 'a', quantity: 1, unit: 'a' }],
      }, // missing "products[0].price"
      {
        products: [{ id: 1, description: 'a', quantity: 1, price: 1 }],
      }, // missing "products[0].unit"
      {
        products: [{ id: 'a', description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "products[0].id" string
      {
        products: [{ id: true, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // missing "products[0].id" boolean
      {
        products: [{ id: 1, description: 1, quantity: 1, price: 1, unit: 'a' }],
      }, // missing "products[0].description" number
      {
        products: [{ id: 1, description: true, quantity: 1, price: 1, unit: 'a' }],
      }, // missing "products[0].description" string
      {
        products: [{ id: 1, description: 'a', quantity: 'a', price: 1, unit: 'a' }],
      }, // missing "products[0].quantity" string
      {
        products: [{ id: 1, description: 'a', quantity: true, price: 1, unit: 'a' }],
      }, // missing "products[0].quantity" boolean
      {
        products: [{ id: 1, description: 'a', quantity: 1, price: 'a', unit: 'a' }],
      }, // missing "products[0].price" string
      {
        products: [{ id: 1, description: 'a', quantity: 1, price: true, unit: 'a' }],
      }, // missing "products[0].price" boolean
      {
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 1 }],
      }, // missing "products[0].unit" number
      {
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: true }],
      }, // missing "products[0].unit" boolean
    ].forEach((invalid) => {
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

    [
      {
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // missing "sellerName"
      {
        sellerName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // missing "purchaserName"
      {
        sellerName: 'a',
        purchaserName: 'a',
      }, // missing "products"
      {
        sellerName: 1,
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "sellerName" number
      {
        sellerName: true,
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "sellerName" boolean
      {
        sellerName: 'a',
        purchaserName: 1,
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "purchaserName" number
      {
        sellerName: 'a',
        purchaserName: true,
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "purchaserName" boolean
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: 'a',
      }, // invalid "products" string
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: 1,
      }, // invalid "products" number
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: true,
      }, // invalid "products" boolean
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: ['a'],
      }, // invalid "products[0]" string
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [1],
      }, // invalid "products[0]" number
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [true],
      }, // invalid "products[0]" boolean
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // missing "products[0].id"
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, quantity: 1, price: 1, unit: 'a' }],
      }, // missing "products[0].description"
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', price: 1, unit: 'a' }],
      }, // missing "products[0].quantity"
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, unit: 'a' }],
      }, // missing "products[0].price"
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 1 }],
      }, // missing "products[0].unit"
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 'a', description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "products[0].id" string
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: true, description: 'a', quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "products[0].id" boolean
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 1, quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "products[0].description" number
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: true, quantity: 1, price: 1, unit: 'a' }],
      }, // invalid "products[0].description" boolean
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 'a', price: 1, unit: 'a' }],
      }, // invalid "products[0].quantity" string
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: true, price: 1, unit: 'a' }],
      }, // invalid "products[0].quantity" boolean
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 'a', unit: 'a' }],
      }, // invalid "products[0].price" string
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: true, unit: 'a' }],
      }, // invalid "products[0].price" boolean
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 1 }],
      }, // invalid "products[0].unit" number
      {
        sellerName: 'a',
        purchaserName: 'a',
        products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: true }],
      }, // invalid "products[0].unit" boolean 
    ].forEach((invalid) => {
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
