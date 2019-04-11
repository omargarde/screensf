-- DROP DATABASE IF EXISTS screensf; 
-- CREATE DATABASE screensf;

DROP TABLE movies CASCADE;
DROP TABLE series CASCADE;
DROP TABLE venues CASCADE;
DROP TABLE showtimes CASCADE;
DROP TABLE screenings CASCADE;
DROP TABLE series_screenings CASCADE;
DROP TABLE series_venues CASCADE;

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
  short_title text,
  city text
);

CREATE TABLE screenings (
  id serial PRIMARY KEY,
  movies_id int REFERENCES movies (id),
  venues_id int REFERENCES venues (id),
  screening_url text,
  start_date date,
  end_date date, 
  format text,
  screening_note text
);

CREATE TABLE showtimes (
  id serial PRIMARY KEY,
  screenings_id int REFERENCES screenings (id),
  showtime text,
  showtime_note text
);

CREATE TABLE series_screenings (
  screenings_id int REFERENCES screenings (id),
  series_id int REFERENCES series (id)
);

CREATE TABLE series_venues (
  venues_id int REFERENCES venues (id),
  series_id int REFERENCES series (id)
);

--insert movie data
INSERT INTO movies (id, title, director, year, duration) VALUES 
  (27322, 'Love Jones', 'Theodore Witcher', 1997, 104);

--insert series data
INSERT INTO series (id, title) VALUES
  (DEFAULT, 'Black Powers: Reframing Hollywood');

--insert venue data
INSERT INTO venues (id, title, short_title, city) VALUES 
  (DEFAULT, 'San Francisco Museum of Modern Art', 'SF MOMA', 'San Francisco'); 

--insert screening data
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
  (DEFAULT, 27322, 1, 'https://www.sfmoma.org/event/love-jones/', '2018-07-15', '2018-07-15', '35mm', 'Introduced by the film''s director');

INSERT INTO showtimes (screenings_id, showtime, showtime_note) VALUES
  (1, '2018-07-15 18:30:00 -8:00', '');

INSERT INTO series_screenings (screenings_id, series_id) VALUES
  (1, 1);

INSERT INTO series_venues (venues_id, series_id) VALUES
  (1, 1);



