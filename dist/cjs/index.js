"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("uuid");
var promiseMap = new Map();
/**
 * Creates a new promise and registers to the map. If a promise with the same id
 * already exists it throws an error.
 *
 * @param promiseId - The unique id for the new promise.
 * @returns Returns a new pending promise.
 */
var createPromise = function (promiseId) {
    if (promiseId === undefined || promiseId === null || promiseId === "") {
        throw new Error("Please give a promise id");
    }
    if (promiseMap.has(promiseId)) {
        throw new Error("A promise with " + promiseId + " id already exists, please destroy or resolve or reject it first");
    }
    return new Promise(function (res, rej) {
        promiseMap.set(promiseId, {
            doResolve: res,
            doReject: rej,
        });
    });
};
exports.create = createPromise;
/**
 * Resolves an existing promise with a value and removes the promise handle
 * from the map. It ignores if the id does not exist.
 * If a promise-like object is given as the value, its resolved value would be
 * used and will be rejected if the given promise is rejected.
 *
 * @param promiseId - The unique id for an existing promise.
 * @param value - The resolved value.
 */
var resolvePromise = function (promiseId, value) {
    if (!promiseMap.has(promiseId)) {
        return;
    }
    var _a = promiseMap.get(promiseId), doResolve = _a.doResolve, doReject = _a.doReject;
    promiseMap.delete(promiseId);
    Promise.resolve(value)
        .then(function (resolvedValue) {
        doResolve(resolvedValue);
    })
        .catch(function (error) {
        doReject(error);
    });
};
exports.resolve = resolvePromise;
/**
 * Rejects an existing promise and removes the promise handle
 * from the map. It ignores if the id does not exist.
 *
 * @param promiseId - The unique id for an existing promise.
 * @param error - An Error instance with a message.
 */
var rejectPromise = function (promiseId, error) {
    if (!promiseMap.has(promiseId)) {
        return;
    }
    var doReject = promiseMap.get(promiseId).doReject;
    promiseMap.delete(promiseId);
    doReject(error);
};
exports.reject = rejectPromise;
/**
 * It just removes the promise instance handle from this library and make
 * it available to be garbage collected. But, if it is being used in other part
 * of code, please resolve or reject it first.
 *
 * @param promiseId - The unique id for an existing promise.
 */
var destroyPromise = function (promiseId) {
    promiseMap.delete(promiseId);
};
exports.destroy = destroyPromise;
/**
 * It just removes all the promise instance handles from this library and make
 * them available to be garbage collected. But, if they are being used in other
 * part of code, please resolve or reject them first.
 */
var destroyAllPromises = function () {
    promiseMap.clear();
};
exports.destroyAll = destroyAllPromises;
/**
 * Returns all the registered promise ids.
 *
 * @returns Returns all promise ids in an array.
 */
var getAllPromiseIds = function () { return tslib_1.__spread(promiseMap.keys()); };
exports.getAllIds = getAllPromiseIds;
/**
 * An utility function to generate a new unique id.
 *
 * @returns Returns an unique id.
 */
var genNewPromiseId = function () { return uuid_1.v4(); };
exports.genNewId = genNewPromiseId;
//# sourceMappingURL=index.js.map