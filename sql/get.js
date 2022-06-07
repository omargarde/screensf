const submitShowtimesOnDate = `SELECT 
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
    string_agg(DISTINCT series.series_uri, ', ') AS series_uri,
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
    screenings.use_alt,
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
    venues.venue_uri,
    screenings.id,
    screenings.alt_title,
    screenings.screening_url,
    screenings.start_date,
    screenings.end_date,
    screenings.format,
    screenings.screening_note,
    screenings.use_alt,
    screenings.canceled
    ORDER BY
    venues.title,
    screenings.alt_title;`;

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
    string_agg(DISTINCT series.series_uri, ', ') AS series_uri,
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
    screenings.use_alt,
    screenings.canceled
    FROM
    screenings
    INNER JOIN movies ON screenings.movies_id=movies.id
    INNER JOIN venues ON screenings.venues_id=venues.id
    INNER JOIN screenings_series ON screenings.id = screenings_series.screenings_id
    INNER JOIN series ON series.id = screenings_series.series_id 
    LEFT JOIN showtimes ON showtimes.screenings_id = screenings.id
    WHERE
    showtimes.showtime >= $1 AND screenings.canceled = 0
    GROUP BY
    showtimes.showtime,
    venues.title,
    movies.title,
    movies.id,
    movies.director,
    movies.release_date,
    movies.runtime,
    venues.id,
    venues.short_title,
    venues.address,
    venues.venue_uri,
    screenings.id,
    screenings.alt_title,
    screenings.screening_url,
    screenings.start_date,
    screenings.end_date,
    screenings.format,
    screenings.screening_note,
    screenings.use_alt,
    screenings.canceled
    ORDER BY
    venues.title,
    showtimes.showtime;`;

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
string_agg(DISTINCT series.series_url, ', ') AS series_url,
string_agg(DISTINCT series.series_uri, ', ') AS series_uri,
string_agg(DISTINCT series.id::character varying, ', ') AS series_id,
screenings.id AS screening_id,
screenings.alt_title,
screenings.screening_url,
screenings.format,
screenings.screening_note,
screenings.use_alt,
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
venues.venue_uri,
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
screenings.screening_note,
screenings.use_alt;`;

const getVenues = `SELECT * from venues ORDER BY title`;

const getVenue = `SELECT * from venues WHERE venue_uri = $1`;

const getSeries = `SELECT * from series`;

const getSeriesByUri = `SELECT * from series WHERE series_uri = $1`;

const getMovies = `SELECT *  FROM  movies`;

const getFeatured = `SELECT * FROM featured_films ORDER BY featured_films.ondate DESC`;

const getScreenings = `SELECT
  screenings.id AS screening_id,
  screenings.movies_id,
  screenings.alt_title,
  screenings.screening_url,
  screenings.start_date,
  screenings.end_date,
  screenings.format,
  screenings.screening_note,
  screenings.use_alt,
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
  screenings.use_alt,
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
  screenings.use_alt,
  screenings.canceled,
  showtime::DATE AS date,
  string_agg(DISTINCT series.title, ', ') AS series,
  string_agg(DISTINCT series.series_url, ', ') AS series_url,
  string_agg(DISTINCT series.series_uri, ', ') AS series_uri,
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
    ) AS showtimes
  FROM
  showtimes
  LEFT JOIN screenings ON showtimes.screenings_id = screenings.id
  LEFT JOIN venues ON screenings.venues_id=venues.id
  LEFT JOIN screenings_series ON screenings.id = screenings_series.screenings_id
  LEFT JOIN series ON series.id = screenings_series.series_id 
  WHERE
  showtimes.showtime >= $1 AND venues.venue_uri = $2 AND screenings.canceled = 0 AND showtimes.hide = 0
  GROUP BY
  showtimes.showtime,
  showtimes.id,
  screenings.id
  ORDER BY
  showtimes.showtime;`;

  const getShowtimesBySeries = `SELECT
  screenings.id AS screening_id,
  screenings.movies_id AS movie_id,
  screenings.alt_title,
  screenings.screening_url,
  screenings.start_date,
  screenings.end_date,
  screenings.format,
  screenings.screening_note,
  screenings.use_alt,
  screenings.canceled,
  venues.title AS venue,
  venues.address AS venue_address,
  venues.id AS venue_id,
  venues.venue_uri AS venue_uri,
  showtime::DATE AS date,
  string_agg(DISTINCT series.title, ', ') AS series,
  string_agg(DISTINCT series.series_url, ', ') AS series_url,
  string_agg(DISTINCT series.series_uri, ', ') AS series_uri,
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
    ) AS showtimes
  FROM
  showtimes
  LEFT JOIN screenings ON showtimes.screenings_id = screenings.id
  LEFT JOIN venues ON screenings.venues_id=venues.id
  LEFT JOIN screenings_series ON screenings.id = screenings_series.screenings_id
  LEFT JOIN series ON series.id = screenings_series.series_id 
  WHERE
  showtimes.showtime >= $1 AND series.series_uri = $2 AND screenings.canceled = 0 AND showtimes.hide = 0
  GROUP BY
  showtimes.showtime,
  showtimes.id,
  screenings.id,
  venues.title,
  venues.address,
  venues.id,
  venues.venue_uri
  ORDER BY
  showtimes.showtime;`;

  const getPrevShowtimesBySeries = `SELECT
  screenings.id AS screening_id,
  screenings.movies_id AS movie_id,
  screenings.alt_title,
  screenings.screening_url,
  screenings.start_date,
  screenings.end_date,
  screenings.format,
  screenings.screening_note,
  screenings.use_alt,
  screenings.canceled,
  venues.title AS venue,
  venues.address AS venue_address,
  venues.id AS venue_id,
  venues.venue_uri AS venue_uri,
  showtime::DATE AS date,
  string_agg(DISTINCT series.title, ', ') AS series,
  string_agg(DISTINCT series.series_url, ', ') AS series_url,
  string_agg(DISTINCT series.series_uri, ', ') AS series_uri,
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
    ) AS showtimes
  FROM
  showtimes
  LEFT JOIN screenings ON showtimes.screenings_id = screenings.id
  LEFT JOIN venues ON screenings.venues_id=venues.id
  LEFT JOIN screenings_series ON screenings.id = screenings_series.screenings_id
  LEFT JOIN series ON series.id = screenings_series.series_id 
  WHERE
  showtimes.showtime < $1 AND series.series_uri = $2 AND screenings.canceled = 0 AND showtimes.hide = 0
  GROUP BY
  showtimes.showtime,
  showtimes.id,
  screenings.id,
  venues.title,
  venues.address,
  venues.id,
  venues.venue_uri
  ORDER BY
  showtimes.showtime;`;

  const getShowtimesOnFilm = `SELECT
  screenings.id AS screening_id,
  screenings.movies_id AS movie_id,
  screenings.alt_title,
  screenings.screening_url,
  screenings.start_date,
  screenings.end_date,
  screenings.format,
  screenings.screening_note,
  screenings.use_alt,
  screenings.canceled,
  venues.title AS venue,
  venues.address AS venue_address,
  venues.id AS venue_id,
  venues.venue_uri AS venue_uri,
  showtime::DATE AS date,
  string_agg(DISTINCT series.title, ', ') AS series,
  string_agg(DISTINCT series.series_url, ', ') AS series_url,
  string_agg(DISTINCT series.series_uri, ', ') AS series_uri,
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
    ) AS showtimes
  FROM
  showtimes
  LEFT JOIN screenings ON showtimes.screenings_id = screenings.id
  LEFT JOIN venues ON screenings.venues_id=venues.id
  LEFT JOIN screenings_series ON screenings.id = screenings_series.screenings_id
  LEFT JOIN series ON series.id = screenings_series.series_id 
  WHERE
  showtimes.showtime >= $1 
    AND (screenings.format = '35mm' OR screenings.format = '16mm' OR screenings.format = '70mm' OR screenings.format = '8mm') 
    AND screenings.canceled = 0 AND showtimes.hide = 0
  GROUP BY
  showtimes.showtime,
  showtimes.id,
  screenings.id,
  venues.title,
  venues.address,
  venues.id,
  venues.venue_uri
  ORDER BY
  showtimes.showtime;`;

module.exports = {
  submitShowtimesOnDate,
  showtimesOnDate,
  recommendedOnDate,
  getVenues,
  getVenue,
  getSeries,
  getSeriesByUri,
  getMovies,
  getScreenings,
  getShowtimeHours,
  getFeatured,
  getShowtimesByVenue,
  getShowtimesBySeries,
  getPrevShowtimesBySeries,
  getShowtimesOnFilm,
};