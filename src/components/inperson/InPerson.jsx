import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { loadImage } from '../helpers';
import Screenings from '../screenings/Screenings';
import { Link } from 'react-router-dom';

const InPerson = () => {
    const { id } = useParams();
    const today = moment(new Date()).format('YYYY-MM-DD');
    const [showData, setShowData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [upcoming, setUpcoming] = useState('')
    const dates = {
        yesterday: moment(new Date()).subtract(1, 'days'),
        today: moment(new Date()),
        tomorrow: moment(new Date()).add(1, 'days'),
        todaysDate: moment(new Date()),
      };


    useEffect(() => {
        const getScreeningsOnFilm = () => {
            axios({
                method: 'get',
                url: `/api/showtimes-inperson/today/${today}/`,
            })
            .then((response) => {
                const { data } = response;
                    setShowData(data);
                    setLoading(false);
                    if (data.length > 0) setUpcoming('Upcoming Showtimes')
            })
            .catch((error) => {
                throw new Error(error);
            })
        }
        getScreeningsOnFilm();
    },[id, today]);

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
                <title>Bay Area Film Screenings | SF Bay Film</title>
                <meta property="og:title" content={`Bay Area Film Screenings | SF Bay Film`}/>
                <meta property="og:url" content={`http://sfbayfilm.com/onfilm/`}/>
                <meta property="og:description" content={` SF Bay Film is a listing of daily showtimes for repertory cinema in the San Francisco Bay Area.`}/>
            </Helmet>
            <h2 className="series-name">In-Person Screenings</h2>
            <div className="series-description">All upcoming film screenings with a special guest in attendance.</div>
            <div className="venue-block">
                <h2 className="upcoming-showtimes">{upcoming}</h2>
                <div>
                    {showData.map((day) => (
                        <div>
                            <h3 className="date-header">
                                <Link to={`/${moment(day.date).format('YYYY-MM-DD')}`}>
                                    {moment(day.date).format('dddd, MMMM D YYYY')}
                                </Link>
                            </h3>
                            <Screenings 
                                venues={day.venues}
                                submit={false}
                                dates={dates}
                                key={day.date}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

};

export default InPerson;