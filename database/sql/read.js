const showtimesOnDate = `SELECT 
    venues.title AS venue,
    venues.short_title AS venueShortTitle,
    venues.address AS venue_address,
    movies.id AS movie_id,
    movies.title AS film,
    movies.director,
    movies.release_date,
    movies.runtime,
    string_agg(DISTINCT series.title, ', ') AS series,
    string_agg(DISTINCT series.series_url, ', ') AS series_url,
    screenings.id AS screening_id,
    screenings.alt_title,
    screenings.screening_url,
    screenings.start_date,
    screenings.end_date,
    string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimesId,
    string_agg(DISTINCT showtimes.showtime, ', ') AS showtimes,
    array_agg(showtimes.hide) AS showtimes_hide,
    screenings.format,
    screenings.screening_note
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
    screenings.start_date,
    screenings.end_date,
    screenings.format,
    screenings.screening_note;`;

const recommendedOnDate = `SELECT 
featured_films.featured_image AS image,
featured_films.author AS writer,
featured_films.article,
venues.title AS venue,
venues.short_title AS venueShortTitle,
venues.address AS venue_address,
movies.title AS film,
movies.director,
movies.release_date,
movies.runtime,
string_agg(DISTINCT series.title, ', ') AS series,
screenings.id AS screening_id,
screenings.alt_title,
screenings.screening_url,
string_agg(DISTINCT showtimes.id::character varying, ', ') AS showtimesId,
string_agg(DISTINCT showtimes.showtime, ', ') AS showtimes,
array_agg(showtimes.hide) AS showtimes_hide,
screenings.format,
screenings.screening_note
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

module.exports = {
  showtimesOnDate,
  recommendedOnDate,
};
