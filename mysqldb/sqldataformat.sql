DROP DATABASE moviedata;
CREATE DATABASE moviedata;

USE moviedata;

CREATE TABLE movietable (
ID        INT    NOT NULL   AUTO_INCREMENT,
title     VARCHAR(150),
imdb      DECIMAL(5,2),
year      VARCHAR(5),
PRIMARY KEY (ID)
);



INSERT INTO movietable (title, imdb, year) VALUES ('A Very Good Year', 8.5, '2013'); 
INSERT INTO movietable (title, imdb, year) VALUES ('A Long Road Home', 7.2, '1963'); 





