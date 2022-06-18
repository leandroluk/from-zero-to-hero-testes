const sinon = require('sinon');

/**
 * @returns {{
 *  sendStatus: sinon.SinonStub,
 *  json: sinon.SinonStub,
 *  status: sinon.SinonStub
 * }}
 */
const makeRes = () => {
  const res = {};
  res.sendStatus = sinon.stub().returns();
  res.json = sinon.stub().returns();
  res.status = sinon.stub().returns(res);
  return res;
};

module.exports = {
  makeRes,
};
