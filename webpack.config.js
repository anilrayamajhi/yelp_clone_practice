const
  webpack = require('webpack'),
  fs = require('fs'),

  path = require('path'),
  join = path.join,
  resolve = path.resolve,

  getConfig = require('hjs-webpack'),

  root    = resolve(__dirname),
  src     = join(root, 'src'),
  modules = join(root, 'node_modules'),
  dest    = join(root, 'dist'),

  isDev = NODE_ENV === 'development'

var config = getConfig({
  isDev = isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true
})

module.exports = config
