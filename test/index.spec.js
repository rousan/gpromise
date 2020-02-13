/* global describe, it */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const GPromise = require('../src');

chai.use(chaiAsPromised).should();

describe('GPromise.create()', () => {
  it('Should throw an error if id is not givenb', () => {
    const p = GPromise.create();
    setTimeout(() => {
      GPromise.resolve(0, 100);
    }, 1000);
    return p.should.eventually.be.equal(100);
  });
});
