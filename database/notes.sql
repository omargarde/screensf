
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


--query for all screenings and related data for a given day, without series data

SELECT 
movies.title,
movies.director,
movies.year,
movies.duration,
venues.title,
venues.short_title,
screenings.screening_url,
screenings.format,
screenings.screening_note
FROM
screenings
INNER JOIN movies ON screenings.movies_id=movies.id
INNER JOIN venues ON screenings.venues_id=venues.id
WHERE
screenings.start_date <= '2018-07-15' AND screenings.end_date >= '2018-07-15';




