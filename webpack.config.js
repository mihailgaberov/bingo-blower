
module.exports = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      },
      // Images
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      // SASS
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  externals: {
    "createjs": "createjs"
  }
}
