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
      sinon.stub(saleModel, 'findByPk').resolves();

      const result = await chai
        .request(app)
        .put(url)
        .send({});

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      const saleModelFindByPK = { toJSON: () => ({}) } as Model;
      const productModelFindAll: any = [{ id: 1 }];
      sinon.stub(productModel, 'findAll').resolves(productModelFindAll);
      sinon.stub(saleModel, 'findByPk').resolves(saleModelFindByPK);
      sinon.stub(saleModel, 'update').resolves();
      sinon.stub(saleProductModel, 'destroy').resolves();
      sinon.stub(saleProductModel, 'bulkCreate').resolves();
      sinon.stub(saleProductModel, 'findAll').resolves([]);

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
      sinon.stub(productModel, 'findAll').resolves([{ id: 1 } as unknown as Model]);
      sinon.stub(saleModel, 'create').resolves({} as Model);
      sinon.stub(saleProductModel, 'bulkCreate').resolves();
      sinon.stub(saleModel, 'findByPk').resolves(model);
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
      sinon.stub(saleModel, 'findByPk').resolves();
      const url = `${baseUrl}/999`;

      const result = await chai
        .request(app)
        .delete(url);

      expect(result.status).to.equal(404);
    });

    it('should return 204 if remove', async () => {
      sinon.stub(saleModel, 'findByPk').resolves({} as Model);
      sinon.stub(saleModel, 'destroy').resolves();

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
      sinon.stub(saleModel, 'findByPk').resolves();

      const result = await chai
        .request(app)
        .get(url);

      expect(result.status).to.equal(404);
    });

    it('should return 200 if success', async () => {
      const url = `${baseUrl}/1`;
      const mock = { toJSON: () => ({}) } as Model;
      sinon.stub(saleModel, 'findByPk').resolves(mock);
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
