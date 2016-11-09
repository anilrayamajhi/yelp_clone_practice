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

  NODE_ENV = process.env.NODE_ENV,
  isDev = NODE_ENV === 'development',

  cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;
  matchCssLoaders = /(^|!)(css-loader)($|!)/;

var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true
})
module.exports = config

config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
])


const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l &&
      l.loader && l.loader.match(match));
  return found ? found[0] : null;
}
// existing css loader
const cssloader =
  findLoader(config.module.loaders, matchCssLoaders);


  // ...
  const newloader = Object.assign({}, cssloader, {
    test: /\.module\.css$/,
    include: [src],
    loader: cssloader.loader
      .replace(matchCssLoaders,
      `$1$2?modules&localIdentName=${cssModulesNames}$3`)
  })
  config.module.loaders.push(newloader);
  cssloader.test =
    new RegExp(`[^module]${cssloader.test.source}`)
  cssloader.loader = newloader.loader
  // ...

  config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css'
})
