# npm-latest-version [![Build Status](https://travis-ci.org/bendrucker/npm-latest-version.svg?branch=master)](https://travis-ci.org/bendrucker/npm-latest-version)

Use [latest-version](https://github.com/sindresorhus/latest-version) instead

> Get the latest dist tag version for an npm package


## Install

```
$ npm install --save npm-latest-version
```


## Usage

```js
var latest = require('npm-latest-version');

latest('xtend');
//=> 4.0.0
```

## API

#### `latest(name, [options], callback)` -> `undefined`

##### name

*Required*  
Type: `string`

The package name on npm.

##### options

Type: `object`

Set `options.base` to override the npm registry URL. Other options are passed directly to [got](https://github.com/sindresorhus/got).

##### callback

*Required*  
Type: `function`

Called with `err, version`. `version` is a string. 

## License

MIT © [Ben Drucker](http://bendrucker.me)
