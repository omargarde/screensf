import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { loadImage } from '../helpers';
import ByDate from './ByDate';

const VenueView = () => {
  const { id } = useParams();
  const today = moment(new Date()).format('YYYY-MM-DD');
  const [venName, setVenName] = useState('');
  const [venAdd, setVenAdd] = useState('');
  const [venUrl, setVenUrl] = useState('');
  const [venDesc, setVenDesc] = useState('');
  const [venImg, setVenImg] = useState('');
  const [showData, setShowData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getVenue = () => {
      axios({
        method: 'get',
        url: `/api/venue/${id}`,
      })
        .then((response) => {
          const { data } = response;
          const ven = data[0];
          setVenName(ven.title);
          setVenAdd(ven.address);
          setVenUrl(ven.venue_url);
          setVenDesc(ven.venue_description);
          setVenImg(ven.img);
          setLoading(false);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    const getVenueView = () => {
      axios({
        method: 'get',
        url: `/api/showtimes-venue/venUri/${id}/today/${today}`,
      }).then((response) => {
        const { data } = response;
        setShowData(data);
      });
    };
    getVenue();
    getVenueView();
  }, [id, today]);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadImage} alt="loading" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <meta charset="UTF-8"/>
        <title>{venName} | SF Bay Film</title>
        <meta property="og:title" content={{venName} + ` | SF Bay Film`}/>
        <meta property="og:url" content={`http://sfbayfilm.com/venues/` + {id}}/>
        <meta property="og:image" content={venImg}/>
        <meta property="og:description" content={{venDesc} + `SF Bay Film is a listing of daily showtimes for repertory cinema in the San Francisco Bay Area.`}/>
        <meta property="og:type" content="website"/>
      </Helmet>
      <div className="venue-img">
        <img src={venImg} alt="venue" />
      </div>
      <h2 className="venue-title">{venName}</h2>
      <div className="venue-address">{venAdd}</div>
      <div className="venue-description">{venDesc}</div>
      <div className="venue-link">
        <a href={venUrl}>Official Website</a>
      </div>
      <div className="venue-block">
        {showData.map((day) => (
          <div>
            <h3 className="date-header">
              {moment(day.date).format('dddd, MMMM D YYYY')}
            </h3>
            <ByDate shows={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueView;
