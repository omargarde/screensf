import React from 'react';
import Recommended from './Recommended.jsx';
import Screenings from './Screenings.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import exampleData from '../../exampleData.js';
import exampleFeature from '../../exampleFeature.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      showtimes: [],
      featured: { 
        "venue": "",
        "series": "",
        "link": "",
        "date": "",
        "showtimes": [],
        "trt": "",
        "format": "",
        "note": "",
        "film": "",
        "director": "",
        "Year": "",
        "ratio": "",
        "country": "",
        "language": "",
        "tmdb": "",
        "article": { short: "", long: ""},
        "writer": "",
      "image": ""
  },
      startDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleShowtimes = this.handleShowtimes.bind(this);

  }

  componentDidMount(){
    this.handleShowtimes();
  }

  handleChange(date) {
    this.setState({
      startDate: date
    }, this.handleShowtimes);

   }
 
  handleRecommended(){
    for(var i = 0; i < exampleFeature.length; i++){
      if(exampleFeature[i].date === this.state.startDate.format('MM/DD/YYYY')){
        let today = exampleFeature[i]
        this.setState({ featured: today });
        return
      }
    }
    this.setState({ featured: { 
        "venue": "",
        "series": "",
        "link": "",
        "date": "",
        "showtimes": [],
        "trt": "",
        "format": "",
        "note": "",
        "film": "",
        "director": "",
        "Year": "",
        "ratio": "",
        "country": "",
        "language": "",
        "tmdb": "",
        "article": { short: "", long: ""},
        "writer": "",
      "image": ""
  } })
  }

  handleShowtimes() {
    let nest = {};
    let arr = [];

    for (var i = 0; i < exampleData.length; i++) {

      if (exampleData[i].date === this.state.startDate.format('MM/DD/YYYY')){

        if (!nest[exampleData[i].venue]){
          nest[exampleData[i].venue] = { 
            venue: exampleData[i].venue, 
            shows: []}
        }

        let showArray = nest[exampleData[i].venue]['shows']
        let match = 0;

        for (var x = 0; x < showArray.length; x++){
          if (showArray[x].film === exampleData[i].film){
            showArray[x].showtimes.push(exampleData[i].showtime);
            match++
          }
        } 

        if (!match) {
          let show = {};
          show.film = exampleData[i].film;
          show.director = exampleData[i].director;
          show.country = exampleData[i].country;
          show.format = exampleData[i].format;
          show.language = exampleData[i].language;
          show.link = exampleData[i].link;
          show.note = exampleData[i].note;
          show.ratio = exampleData[i].ratio;
          show.trt = exampleData[i].trt;
          show.series = exampleData[i].series;
          show.year = exampleData[i].year;
          show.showtimes = [ exampleData[i].showtime ]

          nest[exampleData[i].venue]['shows'].push(show);
        }
      }

    }

    for (var venue in nest) {
        arr.push(nest[venue])
    }
    
    this.handleRecommended()
    
    return this.setState({ showtimes: arr });

  }

  render() {

    return (
      <div>
        <div className="nav">
          <h2>Screen SF</h2>
          <DatePicker
            selected={this.state.startDate}
            onSelect={this.handleChange}
          />
        </div>
        <div className="wrapper">
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