# scrypt-async-modern [![npm version](http://img.shields.io/npm/v/scrypt-async-modern.svg?style=flat)](https://www.npmjs.org/package/scrypt-async-modern)

Fast "async" scrypt implementation in modern JavaScript.

Works in browsers without throwing "kill slow script" warnings due to
configurable interruptStep, which yields from calculation.
Also works with Node.js (but you should really use the C implementation for that).

## Installation

[Yarn](https://yarnpkg.com/):

    $ yarn add scrypt-async-modern

[NPM](https://www.npmjs.org/):

    $ npm install scrypt-async-modern

To improve performance with small interruptStep values, use `setImmediate` shim,
such as <https://github.com/YuzuJS/setImmediate>.

## Usage

`scrypt(password, salt, options)`: `Promise`

Derives a key from password and salt and fulfills a Promise with the derived key as the only argument.

If options.interruptStep is set, calculations are interrupted with setImmediate (or
zero setTimeout) at the given interruptSteps to avoid freezing the browser.
If it's not set or set to zero, the callback is called immediately after the
calculation, avoiding setImmediate.

### Arguments

- `password`: `string` or `Array` of bytes or `Uint8Array`
- `salt`: `string` or `Array` of bytes or `Uint8Array`
- `options`: object with key derivation options (see below)

#### Options:

- `N`: CPU/memory cost parameter, must be power of two (default = 16384),
  alternatively you can specify `logN` where _N = 2^logN_
- `r`: block size parameter (default = 8)
- `p`: parallelization parameter (default = 1)
- `dkLen`: derived key length (default = 32)
- `interruptStep`: (optional) the amount of loop cycles to execute before the next setImmediate/setTimeout (defaults = 0)
- `encoding`: (optional) result encoding `'base64'` or `'hex'` (result will be a `string`), `'binary'` (result will be a `Uint8Array`) or undefined (result will be an `Array` of bytes, default).

### Example:

```javascript
const derivedKey = await scrypt("mypassword", "saltysalt", {
  N: 16384,
  r: 8,
  p: 1,
  dkLen: 16,
  encoding: "hex"
});

console.log(derivedKey); // "5012b74fca8ec8a4a0a62ffdeeee959d"
```

## Notes

Fork of [dchest/scrypt-async-js](https://github.com/dchest/scrypt-async-js).

MIT license.
