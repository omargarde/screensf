const showtimesOnDate = `SELECT 
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    venues.address AS venue_address,
    venues.id AS venue_id,
    venues.venue_uri AS venue_uri,
    movies.id AS movie_id,
    movies.title AS film,
    movies.director,
    movies.release_date,
    movies.runtime,
    string_agg(DISTINCT series.title, ', ') AS series,
    string_agg(DISTINCT series.series_url, ', ') AS series_url,
    string_agg(DISTINCT series.id::character varying, ', ') AS series_id,
    json_agg(json_build_object(
      'id', showtimes.id,
      'screenings_id', showtimes.screenings_id,
      'showtime', showtimes.showtime,
      'showtime_note', showtimes.showtime_note,
      'canceled', showtimes.canceled,
      'hide', showtimes.hide
      )
      ORDER BY
      showtimes.showtime
      ) AS showtimes,
    screenings.id AS screening_id,
    screenings.alt_title,
    screenings.screening_url,
    screenings.start_date,
    screenings.end_date,
    screenings.format,
    screenings.screening_note,
    screenings.canceled
    FROM
    screenings
    INNER JOIN movies ON screenings.movies_id=movies.id
    INNER JOIN venues ON screenings.venues_id=venues.id
    INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
    INNER JOIN series ON series.id = screenings_series.series_id 
    LEFT JOIN showtimes ON showtimes.screenings_id = screenings.id
    WHERE
    screenings.start_date <= $1 AND screenings.end_date >= $1 AND screenings.canceled = 0
    GROUP BY
    venues.title,
    movies.title,
    movies.id,
    movies.director,
    movies.release_date,
    movies.runtime,
    venues.id,
    venues.short_title,
    venues.address,
    screenings.id,
    screenings.alt_title,
    screenings.screening_url,
    screenings.start_date,
    screenings.end_date,
    screenings.format,
    screenings.screening_note,
    screenings.canceled
    ORDER BY
    venues.title,
    screenings.alt_title;`;

const recommendedOnDate = `SELECT 
featured_films.featured_image AS image,
featured_films.author AS writer,
featured_films.article,
venues.title AS venue,
venues.short_title AS venueShortTitle,
venues.address AS venue_address,
venues.venue_uri AS venue_uri,
movies.id AS movie_id,
movies.title AS film,
movies.director,
movies.release_date,
movies.runtime,
string_agg(DISTINCT series.title, ', ') AS series,
screenings.id AS screening_id,
screenings.alt_title,
screenings.screening_url,
screenings.format,
screenings.screening_note,
json_agg(json_build_object(
  'id', showtimes.id,
  'screenings_id', showtimes.screenings_id,
  'showtime', showtimes.showtime,
  'showtime_note', showtimes.showtime_note,
  'canceled', showtimes.canceled,
  'hide', showtimes.hide
  )
  ORDER BY
  showtimes.showtime
  ) AS showtimes
FROM 
featured_films
INNER JOIN screenings ON featured_films.screenings_id=screenings.id
INNER JOIN movies ON screenings.movies_id=movies.id
INNER JOIN venues ON screenings.venues_id=venues.id
INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
INNER JOIN series ON series.id = screenings_series.series_id
LEFT JOIN showtimes ON showtimes.screenings_id = screenings.id
WHERE 
featured_films.ondate = $1
GROUP BY
featured_films.featured_image,
featured_films.author,
featured_films.article,
venues.title,
movies.id,
movies.title,
movies.director,
movies.release_date,
movies.runtime,
venues.short_title,
venues.address,
screenings.id,
screenings.alt_title,
screenings.screening_url,
screenings.format,
screenings.screening_note;`;

const getVenues = `SELECT * from venues ORDER BY title`;

const getVenue = `SELECT * from venues WHERE venue_uri = $1`;

const getSeries = `SELECT * from series`;

const getMovies = `SELECT *  FROM  movies`;

const getFeatured = `SELECT * FROM featured_films`;

const getScreenings = `SELECT
  screenings.id AS screening_id,
  screenings.movies_id,
  screenings.alt_title,
  screenings.screening_url,
  screenings.start_date,
  screenings.end_date,
  screenings.format,
  screenings.screening_note,
  screenings.canceled,
  string_agg(DISTINCT series.id::character varying, ', ') AS series_id,
  venues.id AS venue_id
  FROM
  screenings
  INNER JOIN venues ON screenings.venues_id=venues.id
  INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
  INNER JOIN series ON series.id = screenings_series.series_id 
  WHERE
  screenings.venues_id = $1
  GROUP BY
  screenings.id,
  venues.id,
  series.id,
  screenings.movies_id,
  screenings.alt_title,
  screenings.screening_url,
  screenings.start_date,
  screenings.end_date,
  screenings.format,
  screenings.screening_note,
  screenings.canceled;
  `;

const getShowtimeHours = `SELECT
    *
    FROM
    showtimes
    WHERE
    screenings_id = $1
    ORDER BY
    showtime;
  `;

const getShowtimesByVenue = `SELECT
  screenings.id AS screening_id,
  screenings.movies_id AS movie_id,
  screenings.alt_title,
  screenings.screening_url,
  screenings.start_date,
  screenings.end_date,
  screenings.format,
  screenings.screening_note,
  screenings.canceled,
  showtime::DATE AS date,
  json_agg(json_build_object(
    'id', showtimes.id,
    'screenings_id', showtimes.screenings_id,
    'showtime', showtimes.showtime,
    'showtime_note', showtimes.showtime_note,
    'canceled', showtimes.canceled,
    'hide', showtimes.hide
    )
    ORDER BY
    showtimes.showtime
    ) AS showtimes
  FROM
  showtimes
  LEFT JOIN screenings ON showtimes.screenings_id = screenings.id
  WHERE
  showtimes.showtime >= $1 AND screenings.venues_id = $2 AND screenings.canceled = 0 AND showtimes.hide = 0
  GROUP BY
  showtimes.showtime,
  showtimes.id,
  screenings.id
  ORDER BY
  showtimes.showtime;`;

module.exports = {
  showtimesOnDate,
  recommendedOnDate,
  getVenues,
  getVenue,
  getSeries,
  getMovies,
  getScreenings,
  getShowtimeHours,
  getFeatured,
  getShowtimesByVenue,
};
