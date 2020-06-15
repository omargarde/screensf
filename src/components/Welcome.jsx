import React from 'react';

const Welcome = () => {
  return (
    <div className="featured">
      <img
        src="https://storage.cloud.google.com/filmcans/true-romance-banner.jpg"
        className="featured-image"
        alt="featured"
      />
      <h3>Welcome to the SF Bay Film Calendar</h3>
      <div className="welcome-details">
        The SF Bay Film Calendar is an exciting new resource for filmgoing in
        the Bay Area. Starting in summer 2020, we will list daily showtimes for
        independent theaters, repertory cinema, and select film series and
        festivals. We&apos;ll also recommended a movie for the day. Currently
        we&apos;re listing all virtual screenings being made available in local
        theaters. As theaters begin to reopen, we hope you will return and let
        us be your guide back to the movies.
      </div>
    </div>
  );
};
export default Welcome;
