import React from 'react';

const About = () => {
  const link = 'https://storage.googleapis.com/filmcans/vdM73PvqnJqS3t23h3Pir4dY2xO.jpg';
  return (
    <div>
      <div>
        <img src={link} className="featured-image" alt="welcome" />
        <div className="welcome-details">
          {`The SF Bay Film Calendar is an exciting new resource 
          for filmgoing in the Bay Area. We list daily showtimes
          for independent theaters, repertory cinema, and select film series and
          festivals.`}
        </div>
      </div>
    </div>
  );
};

export default About;
