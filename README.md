[![Build Status](https://travis-ci.org/rousan/gpromise.svg?branch=develop)](https://travis-ci.org/rousan/gpromise)
[![NPM version](https://img.shields.io/npm/v/gpromise.svg)](https://www.npmjs.com/package/gpromise)
[![NPM total downloads](https://img.shields.io/npm/dt/gpromise.svg)](https://www.npmjs.com/package/gpromise)
[![Contributors](https://img.shields.io/github/contributors/rousan/gpromise.svg)](https://github.com/rousan/gpromise/graphs/contributors)
[![License](https://img.shields.io/github/license/rousan/gpromise.svg)](https://github.com/rousan/gpromise/blob/master/LICENSE)

# Global Promise

A helper library to create a promise to be resolved/rejected from your other parts of codebase globally.

## Motivation

Sometimes, we create a promise and we needed to resolve/reject it from other part of codebase globally.
We can achieve the same by implementing event driven code using `EventTarget` or `EventEmitter` , 
but it will require a lot of code.

Solve it with `GPromise` with a few of lines of code:

``` js
import GPromise from 'gpromise';


// Creates a promise to be settled from other parts of code.
GPromise.create('my_id')
  .then((val) => {
    console.log( `Promise with 'my_id' id is resolved with: ${val}` );
  });


// In your other part of code:
setTimeout(() => {
  // Resolve the promise we have just created with id 'my_id' above from other part of your codebase.
  GPromise.resolve('my_id', 'my_value');
}, 2000);
```

## Installation

Install it from `npm`:

```bash
$ npm install gpromise
```

or

```bash
$ yarn add gpromise
```

## Test

Run:

```sh
yarn test
```

## Contributing

Your PRs and stars are always welcome.