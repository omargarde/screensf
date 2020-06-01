INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(601, "E.T. the Extra-Terrestrial", "Steven Spielberg", 1982, 115, "After a gentle alien becomes stranded on Earth, the being is discovered and befriended by a young boy named Elliott. Bringing the extraterrestrial into his suburban California house, Elliott introduces E.T., as the alien is dubbed, to his brother and his little sister, Gertie, and the children decide to keep its existence a secret. Soon, however, E.T. falls ill, resulting in government intervention and a dire situation for both Elliott and the alien.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(329, "Jurassic Park", "Steven Spielberg", 1993, 127, "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(555974, "Brahms: The Boy II", "William Brent Bell", 2020, 86, "After a family moves into the Heelshire Mansion, their young son soon makes friends with a life-like doll called Brahms.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(542224, "Gretel & Hansel", "Oz Perkins", 2020, 87, "A long time ago in a distant fairy tale countryside, a young girl leads her little brother into a dark wood in desperate search of food and work, only to stumble upon a nexus of terrifying evil.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(27322, "Love Jones", "Theodore Witcher", 1997, 104, "Darius Lovehall is a young black poet in Chicago who starts dating Nina Moseley, a beautiful and talented photographer. While trying to figure out if they've got a \"love thing\" or are just \"kicking it,\" they hang out with their friends, talking about love and sex. Then Nina tests the strength of Darius' feelings and sets a chain of romantic complications into motion.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(361292, "Suspiria", "Dario Argento", 1977, 152, "A darkness swirls at the center of a world-renowned dance company, one that will engulf the troupe's artistic director, an ambitious young dancer and a grieving psychotherapist. Some will succumb to the nightmare, others will finally wake up.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(324857, "Spider-Man: Into the Spider-Verse", "Rodney Rothman", 2018, 117, "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(539537, "Fantasy Island", "Jeff Wadlow", 2020, 109, "A group of contest winners arrive at an island hotel to live out their dreams, only to find themselves trapped in nightmare scenarios.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(338967, "Zombieland: Double Tap", "Ruben Fleischer", 2020, 99, "Columbus, Tallahassee, Wichita, and Little Rock move to the American heartland as they face off against evolved zombies, fellow survivors, and the growing pains of the snarky makeshift family.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(570670, "The Invisible Man", "Leigh Whannell", 2020, 124, "When Cecilia's abusive ex takes his own life and leaves her his fortune, she suspects his death was a hoax. As a series of coincidences turn lethal, Cecilia works to prove that she is being hunted by someone nobody can see.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(446893, "Trolls World Tour", "Walt Dohrn", 2020, 91, "Queen Poppy and Branch make a surprising discovery — there are other Troll worlds beyond their own, and their distinct differences create big clashes between these various tribes. When a mysterious threat puts all of the Trolls across the land in danger, Poppy, Branch, and their band of friends must embark on an epic quest to create harmony among the feuding Trolls to unite them against certain doom.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(953, "Madagascar", "Eric Darnell", 2005, 86, "Alex the lion is the king of the urban jungle, the main attraction at New York’s Central Park Zoo. He and his best friends—Marty the zebra, Melman the giraffe and Gloria the hippo—have spent their whole lives in blissful captivity before an admiring public and with regular meals provided for them. Not content to leave well enough alone, Marty lets his curiosity get the better of him and makes his escape—with the help of some prodigious penguins—to explore the world.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(564, "The Mummy", "Stephen Sommers", 1999, 124, "Dashing legionnaire Rick O'Connell stumbles upon the hidden ruins of Hamunaptra while in the midst of a battle to claim the area in 1920s Egypt. It has been over three thousand years since former High Priest Imhotep suffered a fate worse than death as a punishment for a forbidden love—along with a curse that guarantees eternal doom upon the world if he is ever awoken.")
INSERT INTO movies (id, title, director, year, runtime, synopsis) VALUES
(1734, "The Mummy Returns", "Stephen Sommers", 2001, 130, "Rick and Evelyn O’Connell, along with their 8-year-old son Alex, discover the key to the legendary Scorpion King’s might: the fabled Bracelet of Anubis. Unfortunately, a newly resurrected Imhotep has designs on the bracelet as well, and isn’t above kidnapping its new bearer, Alex, to gain control of Anubis’s otherworldly army.")
INSERT INTO venues (id, title, short_title, city, venue_description, currently_open) VALUES
(DEFAULT, "San Francisco Musuem of Modern Art", "SF MOMA", "San Francisco", "", 1)
INSERT INTO venues (id, title, short_title, city, venue_description, currently_open) VALUES
(DEFAULT, "Castro Theater", "Castro Theater", "San Francisco", "", 1)
INSERT INTO venues (id, title, short_title, city, venue_description, currently_open) VALUES
(DEFAULT, "Roxie Theater", "Roxie Theater", "San Francisco", "", 1)
INSERT INTO venues (id, title, short_title, city, venue_description, currently_open) VALUES
(DEFAULT, "West Wind Capitol Drive-In", "West Wind Capitol Drive-In", "San Jose", "", 1)
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 601, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=16689", "2020-31-05", "2020-03-06", "DCP", "Double feature with Jurassic Park" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 329, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=207", "2020-31-05", "2020-03-06", "DCP", "Double feature with E.T." )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 555974, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=289065", "2020-31-05", "2020-03-06", "DCP", "Double feature with Gretel and Hansel" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 542224, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=291642", "2020-31-05", "2020-03-06", "DCP", "Double feature with Brahms: The Boy II" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 539537, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=285307", "2020-31-05", "2020-03-06", "DCP", "Double feature with Zombieland" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 338967, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=275948", "2020-31-05", "2020-03-06", "DCP", "Double feature with Fantasy Island" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 514847, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=271023", "2020-31-05", "2020-03-06", "DCP", "Double feature with Invisible Man" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 570670, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=293548", "2020-31-05", "2020-03-06", "DCP", "Double feature with The Hunt" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 446893, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=240912", "2020-31-05", "2020-03-06", "DCP", "Double feature with Madagascar" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 953, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=11329", "2020-31-05", "2020-03-06", "DCP", "Double feature with Trolls World Tour" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 564, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=16623", "2020-31-05", "2020-03-06", "DCP", "Double feature with The Mummy Returns" )
INSERT INTO screenings (id, movies_id, venues_id, screening_url, start_date, end_date, format, screening_note) VALUES
(DEFAULT, 1734, 4, "https://www.westwinddi.com/locations/capitol/movies/details?code=29552", "2020-31-05", "2020-03-06", "DCP", "Double feature with The Mummy" )
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 1, "2020-31-05 20:50:00-8:00", "this is a showtime note")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 2, "2020-31-05 23:10:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 3, "2020-31-05 20:50:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 4, "2020-31-05 22:40:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 5, "2020-31-05 20:50:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 6, "2020-31-05 23:05:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 7, "2020-31-05 20:50:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 8, "2020-31-05 22:45:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 9, "2020-31-05 20:50:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 10, "2020-31-05 22:45:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 11, "2020-31-05 20:50:00-8:00", "")
INSERT INTO showtimes (id, screenings_id, showtime, showtime_note) VALUES
(DEFAULT, 12, "2020-31-05 23:20:00-8:00", "")
