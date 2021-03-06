import chai from 'chai';
import chaiHttp from 'chai-http';
import { Model } from 'sequelize';
import sinon from 'sinon';
import app from '../../src/app';
import {
  productModel,
  saleModel,
  saleProductModel
} from '../../src/models';
import {
  invalidAddSaleList,
  invalidEditSaleList,
  invaliParamIdList
} from '../_mocks/sale.mock';

const { expect } = chai;

chai.use(chaiHttp);

describe('routes/api/sales', () => {
  beforeEach(sinon.restore);

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
      sinon.stub(saleModel, 'findOne').resolves();

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      sinon.stub(saleModel, 'findOne').resolves({});
      sinon.stub(saleModel, 'updateOne').resolves();
      sinon.stub(saleProductModel, 'deleteOne').resolves();
      sinon.stub(saleProductModel, 'insertMany').resolves();
      sinon.stub(saleProductModel, 'find').resolves([]);

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
      const model = { toJSON: () => ({}) } as Model;
      sinon.stub(productModel, 'findAll').resolves([{ id: 1 } as Model]);
      sinon.stub(saleModel, 'create').resolves({} as Model);
      sinon.stub(saleProductModel, 'bulkCreate').resolves();
      sinon.stub(saleModel, 'findOne').resolves(model);
      sinon.stub(saleProductModel, 'findAll').resolves([model]);
      const result = await chai
        .request(app)
        .post(baseUrl)
        .send({
          sellerName: 'a',
          purchaserName: 'a',
          products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a', }],
        });
      expect(result.status).to.equal(201);
    });
  });

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
      sinon.stub(saleModel, 'findOne').resolves();
      const url = `${baseUrl}/999`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(404);
    });

    it('should return 204 if remove', async () => {
      sinon.stub(saleModel, 'findOne').resolves({} as Model);
      sinon.stub(saleModel, 'deleteOne').resolves();

      const url = `${baseUrl}/1`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(204);
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
      sinon.stub(saleModel, 'findOne').resolves();

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      const mock = { toJSON: () => ({}) } as Model;
      sinon.stub(saleModel, 'findOne').resolves(mock);
      sinon.stub(saleProductModel, 'findAll').resolves([mock]);

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(200);
    });
  });

  describe('GET /', () => {
    const baseUrl = '/api/sales';
    it('should return 200 if sccess', async () => {
      sinon.stub(saleModel, 'findAll').resolves([]);
      const result = await chai
        .request(app)
        .get(baseUrl);

      expect(result.status).to.equal(200);
    });
  });
});
