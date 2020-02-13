/* global GPromise */

GPromise.create(0)
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.error(err);
  });


// ////////////////////

setTimeout(() => {
  GPromise.reject(0, new Error('Its error'));
}, 10000);
