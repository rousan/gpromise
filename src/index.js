import uuid from 'uuid/v4';

const promiseMap = new Map();

/**
 * Creates a new promise and registers to the map. If a promise with the same id
 * already exists it throws an error.
 *
 * @param {String|Number} promiseId - The unique id for the new promise.
 * @returns {Promise} Returns a new pending promise.
 */
const createPromise = (promiseId) => {
  if (promiseId === undefined || promiseId === null || promiseId === '') {
    throw new Error('Please give a promise id');
  }

  if (promiseMap.has(promiseId)) {
    throw new Error(`A promise with ${promiseId} id already exists, please destroy or resolve or reject it first`);
  }

  return new Promise((res, rej) => {
    promiseMap.set(promiseId, {
      doResolve: res,
      doReject: rej,
    });
  });
};

/**
 * Resolves an existing promise with a value and removes the promise handle
 * from the map. It ignores if the id does not exist.
 * If a promise-like object is given as the value, its resolved value would be
 * used and will be rejected if the given promise is rejected.
 *
 * @param {String|Number} promiseId - The unique id for an existing promise.
 * @param {*} value - The resolved value.
 */
const resolvePromise = (promiseId, value) => {
  if (!promiseMap.has(promiseId)) {
    return;
  }

  const { doResolve, doReject } = promiseMap.get(promiseId);
  promiseMap.delete(promiseId);

  Promise.resolve(value)
    .then((resolvedValue) => {
      doResolve(resolvedValue);
    })
    .catch((error) => {
      doReject(error);
    });
};

/**
 * Rejects an existing promise and removes the promise handle
 * from the map. It ignores if the id does not exist.
 *
 * @param {String|Number} promiseId - The unique id for an existing promise.
 * @param {Error} error - An Error instance with a message.
 */
const rejectPromise = (promiseId, error) => {
  if (!promiseMap.has(promiseId)) {
    return;
  }

  const { doReject } = promiseMap.get(promiseId);
  promiseMap.delete(promiseId);

  doReject(error);
};

/**
 * It just removes the promise instance handle from this library and make
 * it available to be garbage collected. But, if it is being used in other part
 * of code, please resolve or reject it first.
 *
 * @param {String|Number} promiseId - The unique id for an existing promise.
 */
const destroyPromise = (promiseId) => {
  promiseMap.delete(promiseId);
};

/**
 * It just removes all the promise instance handles from this library and make
 * them available to be garbage collected. But, if they are being used in other part
 * of code, please resolve or reject them first.
 */
const destroyAllPromises = () => {
  promiseMap.clear();
};

/**
 * Returns all the registered promise ids.
 *
 * @returns {[String|Number]} Returns all promise ids in an array.
 */
const getAllPromiseIds = () => [...promiseMap.keys()];

/**
 * An utility function to generate a new unique id.
 *
 * @returns {String} Returns an unique id.
 */
const genNewPromiseId = () => uuid();

export {
  createPromise as create,
  resolvePromise as resolve,
  rejectPromise as reject,
  destroyPromise as destroy,
  destroyAllPromises as destroyAll,
  getAllPromiseIds as getAllIds,
  genNewPromiseId as genNewId,
};
