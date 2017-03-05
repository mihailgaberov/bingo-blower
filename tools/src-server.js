/**
 * Created by Mihail on 3/5/2017.
 */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.js';
import open from 'open';

const port = 3000;
const app = express();
const compiler = webpack(config);


app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
