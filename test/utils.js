export const promiseResolvedLater = (ms, value) => new Promise((res, rej) => {
  setTimeout(() => {
    res(value);
  }, ms);
});


export const promiseRejectedLater = (ms, error) => new Promise((res, rej) => {
  setTimeout(() => {
    rej(error);
  }, ms);
});
