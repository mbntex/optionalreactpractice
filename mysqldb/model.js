var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test789',
  password : 'test789',
  database : 'moviedata'
});

connection.connect()

var saveMovieData = function (data, callback) {
  console.log('saveMovieData ran!!!');




  for (var i = 0; i < data.length; i++) {
    connection.query(`INSERT INTO movietable (title, imdb, year) VALUES ('${data[i].title}', ${data[i].imdb}, '${data[i].year}');`, function (err, rows, fields) {
      console.log('123ERR = ', err);
      console.log('123Rows = ', rows);
      console.log('TITLE SAVED = ', data[i].title);
      
    })
  }

 //INSERT INTO movietable (title, imdb, year) VALUES ('A Very Good Year', 8.5, '2013');

}

 

var getAllData = function (callback) {
  // connection.query('SELECT * FROM movietable', function (err, rows, fields) {
  //   if (err) {console.log('You have an Error in getAllData!!!')}
  //   console.log('The response is: ', rows);
  // })
  console.log('GET DATA FN WORKING!');
}




module.exports.saveMovieData = saveMovieData;
module.exports.getAllData = getAllData;