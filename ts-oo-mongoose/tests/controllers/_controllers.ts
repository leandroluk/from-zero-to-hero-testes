import { Response } from 'express';
import sinon from 'sinon';

export const makeRes = (): Response & {
  sendStatus: sinon.SinonStub,
  json: sinon.SinonStub,
  status: sinon.SinonStub
} => {
  const res = {
    sendStatus: sinon.stub().returns(undefined),
    json: sinon.stub().returns(undefined),
    status: sinon.stub().callsFake(() => res),
  } as any;
  return res;
};
