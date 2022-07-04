import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import sinon from 'sinon';
import app from '../../src/app';

const { expect } = chai;

chai.use(chaiHttp);

describe('routes/index', () => {
  beforeEach(sinon.restore);

  describe('GET /health', () => {
    const url = '/health';

    it('should return 500 if can\'t connect to db', async () => {
      sinon.stub(mongoose, 'connect').rejects();
      sinon.stub(console, 'error').callsFake(() => { });
      const result = await chai.request(app).get(url);
      expect(result.status).to.equal(500);
    });

    it('should return 200 if connect to db', async () => {
      sinon.stub(mongoose, 'connect').resolves();
      const result = await chai.request(app).get(url);
      expect(result.status).to.equal(200);
    });
  });
});
