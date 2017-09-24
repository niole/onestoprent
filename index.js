const path = require('path');
const express = require('express');
const webpackconfig = require('./webpack.config');
const webpackMiddleware = require('webpack-middleware');
const webpack = require('webpack');

const app = express();

const compiler = webpack(webpackconfig);

app.use(webpackMiddleware(compiler));

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
