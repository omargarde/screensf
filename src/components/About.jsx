import React from 'react';
import { images } from './helpers';

const About = () => {
  const link = images[1];
  return (
    <div>
      <div>
        <img src={link} className="featured-image" alt="welcome" />
        <div className="welcome-details">
          {`The SF Bay Film Calendar is an exciting new resource for filmgoing in
          the Bay Area. Starting in summer 2020, we will list daily showtimes
          for independent theaters, repertory cinema, and select film series and
          festivals. We'll also recommended a movie for the day. Currently
          we're listing all virtual screenings being made available in local
          As theaters begin to reopen, we hope you will return and let us be
          your guide back to the movies.`}
        </div>
      </div>
    </div>
  );
};

export default About;
