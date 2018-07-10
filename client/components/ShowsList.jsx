import React from 'react';
import Showtime from './Showtime.jsx';

const ShowsList = (props) => (
    <div className="shows-film">

      {props.show.series !== '' && <div className="film-series">{props.show.series}</div>}
      <div className="film-title">{props.show.film}</div>
      <div className="film-details">
        {props.show.director !== '' && <div>{props.show.director}</div>}
        {props.show.year > 0 && <div>{props.show.year}</div>}
        {props.show.trt > 0 && <div>{props.show.trt} min</div>}
        {props.show.format !== '' && <div>{props.show.format}</div>}
      </div>
      {props.show.note !== '' && 
          <div>
            {props.show.note.split("\n").map((i, key) => {
              return <div className="film-note" key={key}>{i}</div>;
            })}
          </div>}
      <div className="showtimes">{props.show.showtimes.map(showtime => (
          <Showtime showtime={showtime} key={showtime} />
        ))}
      </div>
    </div>
)




export default ShowsList;


