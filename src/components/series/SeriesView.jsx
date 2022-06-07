import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { loadImage } from '../helpers';
import { dateHandle } from '../submit/helpers';
import Screenings from '../screenings/Screenings';
import { Link } from 'react-router-dom';

const SeriesView = () => {
    const { id } = useParams();
    const today = moment(new Date()).format('YYYY-MM-DD');
    // const today = '2022-04-28';
    const [serName, setSerName] = useState('');
    const [serDesc, setSerDesc] = useState('');
    const [serStart, setStart] = useState('');
    const [serEnd, setEnd] = useState('');
    const [serUrl, setSerUrl] = useState('');
    const [serUri, setSerUri] = useState(id);
    const [showData, setShowData] = useState([]);
    const [prevData, setPrevData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [upcoming, setUpcoming] = useState('')
    const [previous, setPrevious] = useState('')
    const dates = {
        yesterday: moment(new Date()).subtract(1, 'days'),
        today: moment(new Date()),
        tomorrow: moment(new Date()).add(1, 'days'),
        todaysDate: moment(new Date()),
      };
    const dash = ' - ';


    useEffect(() => {
        const getSeriesByUri = () => {
            axios({
                method: 'get',
                url: `/api/series/${id}`,
            })
            .then((response) => {
                const { data } = response;
                const ser = data[0];
                setSerName(ser.title);
                setSerDesc(ser.series_description);
                setStart(dateHandle(ser.start_date));
                setEnd(dateHandle(ser.end_date));
                setSerUrl(ser.series_url);
                setLoading(false)
            })
            .catch((error) => {
                throw new Error(error);
            });
        };
        const getSeriesView = (prev) => {
            axios({
                method: 'get',
                url: `/api/showtimes-series/serUri/${id}/today/${today}/prev/${prev}`,
            })
            .then((response) => {
                const { data } = response;
                if (prev) {
                    let reversed = data.map((val, index, array) => array[array.length - 1 - index])
                    setPrevData(reversed);
                    if (data.length > 0) setPrevious('Previous Showtimes')
                }
                if (!prev) {
                    setShowData(data);
                    if (data.length > 0) setUpcoming('Upcoming Showtimes')
                }
            })
            .catch((error) => {
                throw new Error(error);
            })
        }
        getSeriesByUri();
        getSeriesView(true);
        getSeriesView(false);
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
                <title>{serName} | SF Bay Film</title>
                <meta property="og:title" content={`${serName} | SF Bay Film`}/>
                <meta property="og:url" content={`http://sfbayfilm.com/series/${id}`}/>
                <meta property="og:description" content={`${serDesc} | SF Bay Film is a listing of daily showtimes for repertory cinema in the San Francisco Bay Area.`}/>
            </Helmet>
            <h2 className="series-name">{serName}</h2>
            <div className="series-dates">
                {serStart && (moment(serStart).format('dddd, MMMM D YYYY'))}
                {serStart && (dash)}
                {serStart && (moment(serEnd).format('dddd, MMMM D YYYY'))}
            </div>
            <div className="series-description">{serDesc}</div>
            <div className="series-link">
                <a href={serUrl}>Official Website</a>
            </div>
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
                <h2 className="upcoming-showtimes">{previous}</h2>
                <div>
                    {prevData.map((day) => (
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

export default SeriesView;