/* global GPromise */

GPromise.create('my_id')
  .then((val) => {
    console.log(`Promise with 'my_id' id is resolved with: ${val}`);
  });

GPromise.create('my_id2')
  .then((val) => {
    console.log(`Promise with 'my_id2' id is resolved with: ${val}`);
  });

GPromise.create('my_id3')
  .catch((err) => {
    console.error(`Promise with 'my_id3' id is rejected with: ${err.message}`);
  });


// From other part of code
setTimeout(() => {
  GPromise.resolve('my_id', 'my_value');
}, 2000);

// From other part of code
setTimeout(() => {
  GPromise.resolve('my_id2', 'my_value2');
}, 3000);

// From other part of code
setTimeout(() => {
  GPromise.reject('my_id3', new Error("It's an error"));
}, 4000);
