import React from 'react';
import Recommended from './Recommended.jsx';
import Screenings from './Screenings.jsx';
import Calendar from './Calendar.jsx';
import exampleData from '../../exampleData.js';
import exampleFeature from '../../exampleFeature.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      today: '07/15/2018', 
      showtimes: [],
      featured: exampleFeature,
    };
    this.handleShowtimes = this.handleShowtimes.bind(this);

  }

  componentDidMount(){
    this.handleShowtimes(exampleData);
  }


  handleShowtimes(data) {
    let nest = {};
    let arr = [];

    for (var i = 0; i < data.length; i++) {
        
      if (!nest[data[i].venue]){
        nest[data[i].venue] = { 
          venue: data[i].venue, 
          shows: []}
      }

      let showArray = nest[data[i].venue]['shows']
      let match = 0;

      for (var x = 0; x < showArray.length; x++){
        if (showArray[x].film === data[i].film){
          showArray[x].showtimes.push(data[i].showtime);
          match++
        }
      } 

      if (!match) {
        let show = {};
        show.film = data[i].film;
        show.director = data[i].director;
        show.country = data[i].country;
        show.format = data[i].format;
        show.language = data[i].language;
        show.link = data[i].link;
        show.note = data[i].note;
        show.ratio = data[i].ratio;
        show.trt = data[i].trt;
        show.series = data[i].series;
        show.year = data[i].year;
        show.showtimes = [ data[i].showtime ]

        nest[data[i].venue]['shows'].push(show);
      }
    }

    for (var venue in nest) {
        arr.push(nest[venue])
    }



    return this.setState({ showtimes: arr });

  }

  render() {
    return (
      <div>
        <div className="nav">
          <h2>Screen SF</h2>
        </div>
        <div className="wrapper">
          <Calendar />
          <Recommended featured={this.state.featured} />
          <Screenings venues={this.state.showtimes} />
        </div>
        <div className="nav">
          <h2>Screen SF</h2>
        </div>
      </div>
    )
  }
}

export default App;