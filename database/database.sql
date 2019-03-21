DROP DATABASE IF EXISTS screensf;
CREATE DATABASE screensf;

CREATE TABLE movies (
  id int PRIMARY KEY,
  title text,
  director text,
  year int,
  duration int
);

CREATE TABLE series (
  id serial PRIMARY KEY,
  title text
);

CREATE TABLE venues (
  id serial PRIMARY KEY,
  title text,
  city text,
  region text
);

CREATE TABLE showtimes (
  id serial PRIMARY KEY,
  showtime timestamp,
  showtime_note text
);

CREATE TABLE screenings (
  id serial PRIMARY KEY,
  movie_id int REFERENCES movies (id),
  venue_id int REFERENCES venues (id),
  screening_url text,
  showtimes text,
  format text,
  screening_note text
);


CREATE TABLE series_screenings (
  screening_id int REFERENCES screenings (id),
  series_id int REFERENCES series (id)
);

CREATE TABLE series_venues (
  venue_id int REFERENCES venues (id),
  series_id int REFERENCES series (id)
);

