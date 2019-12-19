'use strict'

var registry = require('registry-url')
var extend = require('xtend')
var get = require('got').get
var dot = require('dot-prop')

var defaults = {
  base: registry(),
  json: true
}

module.exports = function npmLatest (name, options, callback) {
  if (!name) {
    throw new Error('Package name is required')
  }

  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  if (!callback) {
    throw new Error('callback is required')
  }

  options = extend(defaults, options)
  var url = options.base.replace(/\/$/, '') + '/' + name
  delete options.base

  get(url, options, function (err, body) {
    if (err) {
      if (err.code === 404) {
        err = new Error(name + ' was not found on the npm registry')
      }
      return callback(err)
    }
    var latest = dot.get(body, 'dist-tags.latest')
    if (!latest) {
      return callback(new Error('dist-tags.latest was not defined for ' + name))
    }
    callback(null, latest)
  })
}
