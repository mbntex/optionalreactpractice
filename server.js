const express = require('express');
////
var bodyParser = require('body-parser');
var request = require('request');
var DB = require('./mysqldb/model.js');
////
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
 
const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/www'));


////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

////
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static('www'))

app.get('/moviedata', (req, res) => {
  res.send('hello world Neptune 2');
});

app.post('/moviedata', (req, res) => {
  console.log('POST REQ BODY TO SERVER: ', req.body);
  //res.send(200);
  request('https://api.themoviedb.org/3/movie/now_playing?api_key=24ecd27da46066820d28e1addebe8531', function (error, response, body) {
    //if (error) {console.log('API GET Error4567', error); }
    //console.log('API RESPONSE4567', response);
    body = JSON.parse(body);
    //console.log('API BODY RECIEVED =', body);
    //console.log('API BODY RESULTS RECIEVED Here =', body.results[1].title);
    var APIData = [];
    for (var i = 0; i < body.results.length; i ++) {
      var temp = {};
      temp.title = body.results[i].title;
      temp.imdb = body.results[i].vote_average;
      temp.year = body.results[i].release_date.split('-')[0];
      temp.watched = false;
      APIData.push(temp);
    }
      //DB.saveMovieData(APIData, res.send);
    //console.log(APIData);
    res.send(APIData);
    DB.saveMovieData();
  });
});
 

app.post('/moviedataDB', (req, res) => {
  //DB.getAllData();
  console.log('test working!!!');
});





