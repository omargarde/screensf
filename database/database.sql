DROP DATABASE IF EXISTS screensf;
CREATE DATABASE screensf;

DROP TABLE screenings;

CREATE TABLE screenings (
  id int AUTO_INCREMENT PRIMARY KEY,
  venue varchar(50),
  series varchar(50),
  link varchar(50),
  showtime datetime,
  trt varchar(50),
  format varchar(50),
  note varchar(50),
  film FOREIGN KEY,
);


CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  film text,
  director text,
  year text,
  ratio text,
  country text,
  language text,
);

-- Use SERIAL vs AUTOINCREMENT?
-- should date field be datetime? how do alternative APIs handle date and time? 