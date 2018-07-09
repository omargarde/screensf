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
    let showsByVenue = {}
    data.forEach(function(showtime) {
      if(!showsByVenue[showtime.Venue]) {
        showsByVenue[showtime.Venue] = [];
        showsByVenue[showtime.Venue].push(showtime)
      }
      showsByVenue[showtime.Venue].push(showtime);
    })
    

    return this.setState({showtimes: showsByVenue});
  }

  render() {
    return (
      <div>
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