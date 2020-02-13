/* global describe, it, afterEach */
/* eslint-disable no-unused-vars */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { promiseResolvedLater, promiseRejectedLater } from './utils';
import * as GPromise from '../src';

chai.use(chaiAsPromised).should();
const { expect } = chai;

afterEach(() => {
  GPromise.destroyAll();
});

describe('GPromise.create()', () => {
  it('Should throw an error if id is not given', () => {
    const mockFn = () => { GPromise.create(); };

    expect(mockFn).to.throw(Error);
  });

  it('Should throw an error if id already exists', () => {
    const p = GPromise.create(100);
    const mockFn = () => { GPromise.create(100); };

    expect(mockFn).to.throw(Error);
  });

  it('Should return a promise when a valid id is provided', () => {
    const p = GPromise.create(100);

    expect(p).to.be.instanceOf(Promise);
    expect(GPromise.getAllIds()).to.have.lengthOf(1);
  });
});

describe('GPromise.resolve()', () => {
  it('Should resolve a created promise', () => {
    const p = GPromise.create(100);

    setTimeout(() => {
      GPromise.resolve(100, 'Some Value');
      expect(GPromise.getAllIds()).to.have.lengthOf(0);
    }, 0);

    return p
      .then((value) => {
        expect(value).to.equal('Some Value');
      });
  });

  it('Should resolve with resolved value if a promise is provided', () => {
    const p = GPromise.create(100);

    setTimeout(() => {
      const p2 = promiseResolvedLater(1000, 'Some Value');
      GPromise.resolve(100, p2);
      expect(GPromise.getAllIds()).to.have.lengthOf(0);
    }, 0);

    return p
      .then((value) => {
        expect(value).to.equal('Some Value');
      });
  });

  it('Should reject if a promise is provided and it is rejected', () => {
    const p = GPromise.create(100);

    setTimeout(() => {
      const p2 = promiseRejectedLater(1000, new Error('Some Error'));
      GPromise.resolve(100, p2);
      expect(GPromise.getAllIds()).to.have.lengthOf(0);
    }, 0);

    return p
      .catch((err) => {
        expect(err).to.be.instanceOf(Error);
      });
  });
});

describe('GPromise.reject()', () => {
  it('Should reject a created promise', () => {
    const p = GPromise.create(100);

    setTimeout(() => {
      GPromise.reject(100, new Error('Some Error'));
      expect(GPromise.getAllIds()).to.have.lengthOf(0);
    }, 0);

    return p
      .catch((err) => {
        expect(err).to.be.instanceOf(Error);
      });
  });
});

describe('GPromise.destroyPromise()', () => {
  it('Should destroy a created promise', () => {
    const p = GPromise.create(100);
    const p2 = GPromise.create(101);

    GPromise.destroy(100);

    expect(GPromise.getAllIds()).to.have.lengthOf(1);
  });
});

describe('GPromise.destroyAllPromises()', () => {
  it('Should destroy all created promises', () => {
    const p = GPromise.create(100);
    const p2 = GPromise.create(101);
    const p3 = GPromise.create(102);

    GPromise.destroyAll();

    expect(GPromise.getAllIds()).to.have.lengthOf(0);
  });
});

describe('GPromise.getAllIds()', () => {
  it('Should return all registered promise ids', () => {
    const p = GPromise.create(100);
    const p2 = GPromise.create(101);
    const p3 = GPromise.create(102);

    expect(GPromise.getAllIds()).to.have.lengthOf(3);
  });
});
