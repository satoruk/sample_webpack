import path from 'path';

function _path(p) {
  return path.resolve(__dirname, p);
}

const clientConfig = {
  target: 'web',
  entry: './src/index.js',
  output: {
    path: _path('dist'),
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};

const serverConfig = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: _path('dist'),
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};

export default [clientConfig, serverConfig];
