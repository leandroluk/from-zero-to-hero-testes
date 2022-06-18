const sinon = require('sinon');

/**
 * @returns {{
 *  sendStatus: sinon.SinonStub,
 *  json: sinon.SinonStub,
 *  status: sinon.SinonStub
 * }}
 */
const makeRes = () => {
  const res = {
    sendStatus: sinon.stub().returns(undefined),
    json: sinon.stub().returns(undefined),
    status: sinon.stub().callsFake(() => res),
  };
  return res;
};

module.exports = {
  makeRes,
};
