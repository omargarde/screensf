-- DROP DATABASE IF EXISTS screensf; 
-- CREATE DATABASE screensf;

DROP TABLE movies CASCADE;
DROP TABLE series CASCADE;
DROP TABLE venues CASCADE;
DROP TABLE showtimes CASCADE;
DROP TABLE screenings CASCADE;
DROP TABLE screenings_series CASCADE;
DROP TABLE venues_series CASCADE;
DROP TABLE featured_films CASCADE;

CREATE TABLE movies (
  id int PRIMARY KEY,
  title text,
  director text,
  year int,
  duration int,
  synopsis text
);

CREATE TABLE series (
  id serial PRIMARY KEY,
  title text,
  start_date date,
  end_date date, 
  description text
);

CREATE TABLE venues (
  id serial PRIMARY KEY,
  title text,
  short_title text,
  city text,
  description text
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


--insert movie data
INSERT INTO movies (id, title, director, year, duration, synopsis) VALUES 
  (27322, 'Love Jones', 'Theodore Witcher', 1997, 104, 'Forgotten gem from the 1990s');

INSERT INTO movies (id, title, director, year, duration, synopsis) VALUES 
  (324857, 'Spider-Man: Into the Spider-Verse', 'Rodney Rothman', 2018, 117, 'Best Spider-Man ever made');

INSERT INTO movies (id, title, director, year, duration, synopsis) VALUES 
  (361292, 'Suspiria', 'Dario Argento', 1977, 152, 'The classic Giallo film from master director Dario Argento');


--insert series data
INSERT INTO series (id, title, start_date, end_date, description) VALUES
  (DEFAULT, 'Black Powers: Reframing Hollywood', '2018-07-15', '2018-07-15', 'African American film series at the MoMa');

INSERT INTO series (id, title, start_date, end_date, description) VALUES
  (DEFAULT, 'Everything in 35', '2018-07-15', '2018-07-15', 'Jesse Ficks hosts this series of movies all presented in 35mm');

INSERT INTO series (id, title, start_date, end_date, description) VALUES
  (DEFAULT, 'Scary Stories SF', '2018-07-15', '2018-07-15', 'Spooktacular series hosted by Kenny Redublo');

INSERT INTO series (id, title, start_date, end_date, description) VALUES
  (DEFAULT, 'October 2019', '2018-07-15', '2018-07-15', 'This is the monthly calendar for the Castro Thetaer');

--insert venue data
INSERT INTO venues (id, title, short_title, city, description) VALUES 
  (DEFAULT, 'San Francisco Museum of Modern Art', 'SF MOMA', 'San Francisco', 'San Francisco''s Modern Art Museum'); 

INSERT INTO venues (id, title, short_title, city, description) VALUES 
  (DEFAULT, 'Castro Theater', 'Castro Theater', 'San Francisco', 'The largest classic screen in San Francisco'); 

INSERT INTO venues (id, title, short_title, city, description) VALUES 
  (DEFAULT, 'Roxie Theater', 'Roxie', 'San Francisco', 'The oldest and coolest theater in the Mission'); 

--insert screening data
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
  (DEFAULT, 27322, 1, 'https://www.sfmoma.org/event/love-jones/', '2018-07-15', '2018-07-15', '35mm', 'Introduced by the film''s director');

INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
  (DEFAULT, 324857, 2, 'http://www.castrotheatre.com', '2018-07-15', '2018-07-15', 'DCP', '');

INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
  (DEFAULT, 361292, 3, 'http://www.roxie.come', '2018-07-15', '2018-07-16', '35mm', '');

--insert showtimes

INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
  (DEFAULT, 1, '2018-07-15 20:30:00-8:00', '');

INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
  (DEFAULT, 2, '2018-07-15 19:30:00-8:00', '');

INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
  (DEFAULT, 3, '2018-07-15 19:00:00-8:00', '');

--insert associate series with their screenings 

INSERT INTO screenings_series (screenings_id, series_id) VALUES
  (1, 1);

INSERT INTO screenings_series (screenings_id, series_id) VALUES
  (2, 4);

INSERT INTO screenings_series (screenings_id, series_id) VALUES
  (3, 3);

INSERT INTO venues_series (venues_id, series_id) VALUES
  (1, 1);

INSERT INTO venues_series (venues_id, series_id) VALUES
  (2, 2);

INSERT INTO venues_series (venues_id, series_id) VALUES
  (3, 3);


INSERT INTO featured_films (id, screenings_id, ondate, featured_image, author, article) VALUES
  (DEFAULT, 1, '2018-07-15', 'http://d1hz8coy0n2714.cloudfront.net/lovejones.jpg','Tre''vell Anderson', 'Before “Love Jones,” black romance on the big screen was hard to come by. Sure, “Mahogany,” starring Diana Ross and Billy Dee Williams, had paved the way, but that was in 1975. Since then, most of the movies featuring black people were about ‘hood life: poverty, gangs, drugs and guns. Someone was always dying by the time the credits rolled. \n \n Then, in 1997, came a simple movie about the love lives of black artists in Chicago. Starring Larenz Tate and Nia Long, writer-director Ted Witcher’s debut film followed the rise and fall, and rise again, of a relationship between a young poet named Darius Lovehall and Nina Mosley, a photographer. Set in the city’s spoken-word scene, “Love Jones” showcased a different aspect of black life, one where struggle and strife did not dictate one’s circumstances, where one’s group of friends, played by Isaiah Washington, Lisa Nicole Carson, Bill Bellamy and Leonard Roberts, were more like family.')

