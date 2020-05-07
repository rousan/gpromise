export const promiseResolvedLater = (
  ms: number,
  value: string
): Promise<string> =>
  new Promise((res) => {
    setTimeout(() => {
      res(value);
    }, ms);
  });

export const promiseRejectedLater = (
  ms: number,
  error: Error
): Promise<Error> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      rej(error);
    }, ms);
  });
