-- DROP DATABASE IF EXISTS screensf; 
-- CREATE DATABASE screensf;

-- DROP TABLE movies CASCADE;
-- DROP TABLE series CASCADE;
-- DROP TABLE venues CASCADE;
-- DROP TABLE showtimes CASCADE;
-- DROP TABLE screenings CASCADE;
-- DROP TABLE screenings_series CASCADE;
-- DROP TABLE venues_series CASCADE;
-- DROP TABLE featured_films CASCADE;

CREATE TABLE movies (
  id int PRIMARY KEY,
  title text,
  director text,
  year int,
  runtime int,
  synopsis text
);

CREATE TABLE series (
  id serial PRIMARY KEY,
  title text,
  start_date date,
  end_date date,
  series_description text
);

CREATE TABLE venues (
  id serial PRIMARY KEY,
  title text,
  short_title text,
  city text,
  venue_description text,
  address text,
  currently_open int
);

CREATE TABLE screenings (
  id serial PRIMARY KEY,
  movies_id int REFERENCES movies (id),
  venues_id int REFERENCES venues (id),
  screening_url text,
  start_date date,
  end_date date,
  format text,
  screening_note text,
  canceled int
);

CREATE TABLE showtimes (
  id serial PRIMARY KEY,
  screenings_id int REFERENCES screenings (id),
  showtime text,
  showtime_note text,
  canceled int
);

CREATE TABLE screenings_series (
  id serial PRIMARY KEY,
  screenings_id int REFERENCES screenings (id),
  series_id int REFERENCES series (id)
);

CREATE TABLE venues_series (
  id serial PRIMARY KEY,
  venues_id int REFERENCES venues (id),
  series_id int REFERENCES series (id)
);


CREATE TABLE featured_films (
  id serial PRIMARY KEY,
  screenings_id int REFERENCES screenings (id),
  ondate date,
  featured_image text,
  author text,
  article text
);

INSERT INTO series (id, title, start_date, end_date, series_description) VALUES
  (DEFAULT, '', null, null, '');