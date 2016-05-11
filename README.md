# [redux-storage-decorator-immutable-filter][]

[![build](https://travis-ci.org/danscan/redux-storage-decorator-immutable-filter.svg?branch=master)](https://travis-ci.org/danscan/redux-storage-decorator-immutable-filter)
[![dependencies](https://david-dm.org/danscan/redux-storage-decorator-immutable-filter.svg)](https://david-dm.org/danscan/redux-storage-decorator-immutable-filter)
[![devDependencies](https://david-dm.org/danscan/redux-storage-decorator-immutable-filter/dev-status.svg)](https://david-dm.org/danscan/redux-storage-decorator-immutable-filter#info=devDependencies)

[![license](https://img.shields.io/npm/l/redux-storage-decorator-immutable-filter.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-decorator-immutable-filter)
[![npm version](https://img.shields.io/npm/v/redux-storage-decorator-immutable-filter.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-decorator-immutable-filter)
[![npm downloads](https://img.shields.io/npm/dm/redux-storage-decorator-immutable-filter.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-decorator-immutable-filter)
[![Code Climate](https://codeclimate.com/github/danscan/redux-storage-decorator-immutable-filter/badges/gpa.svg)](https://codeclimate.com/github/danscan/redux-storage-decorator-immutable-filter)

Filter decorator for [redux-storage][] to only store a subset of the whole
state tree.  Especially useful if your state tree is an immutable Map.

## Installation

    npm install --save redux-storage-decorator-immutable-filter

## Usage

Simply wrap your engine in this decorator, whitelist all keys that should
be passed through and blacklist the keys that shouldn't.

```javascript
import filter from 'redux-storage-decorator-immutable-filter'

engine = filter(engine, [
    'whitelisted-key',
    ['nested', 'key'],
    ['another', 'very', 'nested', 'key']
], [
    'backlisted-key',
    ['nested', 'blacklisted-key']
]);
```

  [redux-storage]: https://github.com/michaelcontento/redux-storage
