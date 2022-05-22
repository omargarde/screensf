import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { loadImage } from '../helpers';

const SeriesView = () => {
    const { id } = useParams();
    const today = moment(new Date()).format('YYYY-MM-DD');
    const [serName, setSerName] = useState('');
    const [serDesc, setSerDesc] = useState('');
    const [serStart, setStart] = useState('');
    const [serEnd, setEnd] = useState('');
    const [serUrl, setSerUrl] = useState('');
    const [showData, setShowData] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getSeries = () => {
            axios({
                method: 'get',
                url: `api/series/${id}`,
            })
            .then((response) => {
                const { data } = response;
                const ser = data[0];
                setSerName(ser.title);
                setSerDesc(ser.description);
                setStart(ser.start_date);
                setEnd(ser.end_date);
                setEndDate(ser.end_date);
                setSerUrl(ser.url);
                setLoading(false)
            })
            .catch((error) => {
                throw new Error(error);
            });
        };
        const getSeriesView = () => {
            axios({
                method: 'get',
                url: `/api/showtimes-series/serUri/${id}/today/${today}`,
            })
            .then((response) => {
                const { data } = response;
                setShowData(data);
            })
            .catch((error) => {
                throw new Error(error);
            })
        }
        getSeries();
        getSeriesView;
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
            <div className="series-description">{serDesc}</div>
            <div className="series-dates">
                <div className="series-start">{serStart}</div>
                <div className="series-end">{serEnd}</div>
            </div>
            <div className="series-link">
                <a href={serUrl}>Official Website</a>
            </div>
        </div>
    )

};

export default SeriesView;