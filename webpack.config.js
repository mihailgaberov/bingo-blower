import webpack from 'webpack';

export default {
  debug: true,
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']}
    ]
  },
  externals: {
    // Include createjs script on your page, then add the below.
    // The left hand side represents the global module that gets exposed to your ES6 code
    // The right hand side represents the object that is exposed/imported from your externally referenced script.

    "createjs": "createjs"
  }
};