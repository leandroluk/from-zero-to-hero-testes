const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const db = require('../../src/db');

const { expect } = chai;

chai.use(chaiHttp);

describe('routes/index', () => {
  beforeEach(sinon.restore);

  describe('GET /health', () => {
    const url = '/health';

    it('should return 500 if can\'t connect to db', async () => {
      sinon.stub(db, 'query').rejects();
      sinon.stub(console, 'warn').returns();
      const result = await chai.request(app).get(url);
      expect(result.status).to.equal(500);
    });

    it('should return 200 if connect to db', async () => {
      sinon.stub(db, 'query').resolves();
      const result = await chai.request(app).get(url);
      expect(result.status).to.equal(200);
    });
  });
});
