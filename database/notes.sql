

--insert venue data
INSERT INTO venues (title, short_title, city) VALUES 
  ('San Francisco Museum of Modern Art', 'SF MOMA', 'San Francisco'); 

--insert series data
INSERT INTO series (title) VALUES
  ('Black Powers: Reframing Hollywood');

--insert movie data
INSERT INTO movies (id, title, director, year, duration) VALUES 
  (27322, 'Love Jones', 'Theodore Witcher', 1997, 104);

--insert screening data
INSERT INTO screenings (id, movie_id, venue_id, screening_url, showtimes, format, screening_note) VALUES
  (DEFAULT, 27322, 1, 'https://www.sfmoma.org/event/love-jones/', '6:30 PM', '35mm', 'Introduced by the film''s director');

--insert showtimes data (part two)

--select venue id
SELECT id FROM venues WHERE title = 'San Francisco Museum of Modern Art';

--select series id


   