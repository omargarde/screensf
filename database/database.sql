DROP DATABASE IF EXISTS screensf;
CREATE DATABASE screensf;

CREATE TABLE screenings (
  id serial PRIMARY KEY,
  movie FOREIGN KEY,
  venue FOREIGN KEY,
  screening_url text,
  showtimes text,
  format text,
  screening_note text,
);

CREATE TABLE showtimes (
  id serial PRIMARY KEY,
  showtime datetime,
  showtime_note text,
);


CREATE TABLE movies (
  id int PRIMARY KEY UNIQUE,
  title text,
  director text,
  year int,
  duration int,
);

CREATE TABLE series (
  id serial PRIMARY KEY,
  title text,
);

CREATE TABLE venues (
  id serial PRIMARY KEY,
  title text,
  city text,
  region text,
);

CREATE TABLE series_screenings (
  screening_id FOREIGN KEY,
  series_id FOREIGN KEY,
);

CREATE TABLE series_venues (
  venue_id FOREIGN KEY,
  series_id FOREIGN KEY,
)

