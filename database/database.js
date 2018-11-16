const exampleData = require('./exampleData')
const exampleFeature = require('./exampleFeature')

const fetchShowtimes = (date) => {

  let nest = {};
  let arr = [];
  for (var i = 0; i < exampleData.length; i++) {
    if (exampleData[i].date === date){
      if (!nest[exampleData[i].venue]){
        nest[exampleData[i].venue] = { 
          venue: exampleData[i].venue, 
          shows: []
        }
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
        let show = exampleData[i];
        show.showtimes = [ exampleData[i].showtime ]
        nest[exampleData[i].venue]['shows'].push(show);
      }
    }

  }

  for (var venue in nest) {
      arr.push(nest[venue])
  }

  return arr

}


const fetchRecommended = (date) => {
    for (var i = 0; i < exampleFeature.length; i++){
      if (exampleFeature[i].date === date){
        let today = exampleFeature[i]
        return today
      }
    }

}


module.exports = { fetchShowtimes, fetchRecommended }