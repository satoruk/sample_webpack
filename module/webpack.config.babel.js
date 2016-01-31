import 'babel-polyfill';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production'),
  __DEV__: DEBUG
};

function _path(p) {
  return path.resolve(__dirname, p);
}

function toLoaderParam(params) {
  return Object.keys(params).reduce((r,k) => {
    if (params[k] === false) return r;
    r.push(params[k] === true ? k : `${k}=${params[k]}`);
    return r;
  }, []).join('&');
}

const cssLoaderParam = {
  modules: true,
  sourceMap: false,
  minimize: true,
  localIdentName: '[hash:base64:5]',
  importLoaders: 1
};
if (DEBUG) {
  Object.assign(cssLoaderParam, {
    sourceMap: true,
    minimize: false,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  });
}

console.log(toLoaderParam(cssLoaderParam));


const clientConfig = {
  cache: DEBUG,
  debug: DEBUG,
  // devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  devtool: DEBUG ? 'source-map' : false,
  entry: {
    client: './src/index.js'
  },
  output: {
    path: _path('dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          `css-loader?${toLoaderParam(cssLoaderParam)}!postcss-loader`
        )
      }
    ]
  },
  postcss: [
    require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};

export default [clientConfig];
