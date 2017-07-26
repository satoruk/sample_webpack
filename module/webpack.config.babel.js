import 'babel-polyfill';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = ENV === 'development';

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
  importLoaders: 1,
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
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            // options: {
            //   presets: [
            //     ['env', {'modules': false}]
            //   ],
            // },
          }
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: cssLoaderParam,
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
                ],
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'components'],
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({ debug: DEBUG }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};

export default [clientConfig];
