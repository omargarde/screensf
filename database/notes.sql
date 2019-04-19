
--insert movie data
INSERT INTO movies (id, title, director, year, duration) VALUES 
  (324857, 'Spider-Man: Into The Spider Verse', 'Rodney Rothman', 2018, 117);

--insert series data
INSERT INTO series (id, title) VALUES
  (DEFAULT, 'Black Powers: Reframing Hollywood');

--insert venue data
INSERT INTO venues (id, title, short_title, city) VALUES 
  (DEFAULT, 'Castro Theater', 'Castro Theater', 'San Francisco'); 

--insert screening data
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
  (DEFAULT, 324857, 1, 'http://www.google.com', '2018-07-15', '2018-07-15', 'DCP', '');

INSERT INTO showtimes (screenings_id, showtime, showtime_note) VALUES
  (3, '2018-07-15 18:30:00 -8:00', '');

INSERT INTO series_screenings (screenings_id, series_id) VALUES
  (3, 1);

INSERT INTO series_venues (venues_id, series_id) VALUES
  (2, 1);


--query for all screenings and related data for a given day, without series data

SELECT 
  venues.title AS venue_title,
  venues.short_title AS venue_short_title,
  movies.title,
  movies.director,
  movies.year,
  movies.duration,
  string_agg(DISTINCT series.title, ', ') AS series_title,
  screenings.screening_url,
  string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimes_id,
  string_agg(DISTINCT showtimes.showtime, ', ') AS showtimes,
  screenings.format,
  screenings.screening_note
FROM
  screenings
INNER JOIN movies ON screenings.movies_id=movies.id
INNER JOIN venues ON screenings.venues_id=venues.id
INNER JOIN series_screenings ON screenings.id = series_screenings.screenings_id
INNER JOIN series ON series.id = series_screenings.series_id 
INNER JOIN showtimes ON showtimes.screenings_id = screenings.id
WHERE
  screenings.start_date <= '2018-07-15' AND screenings.end_date >= '2018-07-15'
GROUP BY
  venues.title,
  movies.title,
  movies.director,
  movies.year,
  movies.duration,
  venues.short_title,
  screenings.screening_url,
  screenings.format,
  screenings.screening_note;
