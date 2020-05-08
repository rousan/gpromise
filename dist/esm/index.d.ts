/**
 * Creates a new promise and registers to the map. If a promise with the same id
 * already exists it throws an error.
 *
 * @param promiseId - The unique id for the new promise.
 * @returns Returns a new pending promise.
 */
declare const createPromise: <T>(promiseId?: string | number | undefined) => Promise<T>;
/**
 * Resolves an existing promise with a value and removes the promise handle
 * from the map. It ignores if the id does not exist.
 * If a promise-like object is given as the value, its resolved value would be
 * used and will be rejected if the given promise is rejected.
 *
 * @param promiseId - The unique id for an existing promise.
 * @param value - The resolved value.
 */
declare const resolvePromise: (promiseId: string | number, value: unknown) => void;
/**
 * Rejects an existing promise and removes the promise handle
 * from the map. It ignores if the id does not exist.
 *
 * @param promiseId - The unique id for an existing promise.
 * @param error - An Error instance with a message.
 */
declare const rejectPromise: (promiseId: string | number, error: Error) => void;
/**
 * It just removes the promise instance handle from this library and make
 * it available to be garbage collected. But, if it is being used in other part
 * of code, please resolve or reject it first.
 *
 * @param promiseId - The unique id for an existing promise.
 */
declare const destroyPromise: (promiseId: string | number) => void;
/**
 * It just removes all the promise instance handles from this library and make
 * them available to be garbage collected. But, if they are being used in other
 * part of code, please resolve or reject them first.
 */
declare const destroyAllPromises: () => void;
/**
 * Returns all the registered promise ids.
 *
 * @returns Returns all promise ids in an array.
 */
declare const getAllPromiseIds: () => (string | number)[];
/**
 * An utility function to generate a new unique id.
 *
 * @returns Returns an unique id.
 */
declare const genNewPromiseId: () => string | number;
export { createPromise as create, resolvePromise as resolve, rejectPromise as reject, destroyPromise as destroy, destroyAllPromises as destroyAll, getAllPromiseIds as getAllIds, genNewPromiseId as genNewId, };
