import React from 'react';
import Recommended from './Recommended.jsx';
import Screenings from './Screenings.jsx';
import Calendar from './Calendar.jsx';
import exampleData from '../../exampleData.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      today: '07/15/2018', 
      showtimes: [], 
      recommended: []
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
        
      if (!nest[data[i].Venue]){
        nest[data[i].Venue] = { venue: data[i].Venue, shows: []}
      }

      let showArray = nest[data[i].Venue]['shows']
      let match = 0;

      for (var x = 0; x < showArray.length; x++){
        if (showArray[x].film === data[i].Film){
          showArray[x].showtimes.push(data[i].Showtime);
          match++
        }
      } 

      if (!match) {
        let show = {};
        show.film = data[i].Film;
        show.director = data[i].Director;
        show.country = data[i].Country;
        show.format = data[i].Format;
        show.language = data[i].Language;
        show.link = data[i].Link;
        show.note = data[i].Note;
        show.ratio = data[i].RATIO;
        show.trt = data[i].TRT;
        show.series = data[i].Series;
        show.year = data[i].Year;
        show.showtimes = [ data[i].Showtime ]

        nest[data[i].Venue]['shows'].push(show);
      }
    }

    for (var venue in nest) {
        arr.push(nest[venue])
    }

    console.log(arr)

    return this.setState({ showtimes: arr });

  }

  render() {
    return (
      <div className="wrapper">
        <div>Screen SF</div>
        <Calendar />
        <Recommended />
        <Screenings venues={this.state.showtimes}/>
        <div>Contact us here</div>
        <div></div>
      </div>
    )
  }
}

export default App;