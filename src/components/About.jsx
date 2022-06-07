import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
  const link = 'https://storage.googleapis.com/filmcans/vdM73PvqnJqS3t23h3Pir4dY2xO.jpg';
  return (
    <div>
      <Helmet>
        <title>SF Bay Film | About</title>
        <meta property="og:title" content={`About | SF Bay Film`}/>
      </Helmet>
      <div>
        <img src={link} className="featured-image" alt="welcome" />
        <div className="welcome-details">
          {`SF Bay Film is an exciting new resource 
          for filmgoing in the Bay Area. We list daily showtimes
          for independent theaters, repertory cinema, and select film series and
          festivals. Questions? Feel free to hit us up on Twitter. @sfbayfilm`}
        </div>
      </div>
    </div>
  );
};

export default About;
