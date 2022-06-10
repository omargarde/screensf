import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Venues from './components/venues/Venues';
import About from './components/About';
import VenueView from './components/venues/VenueView';
import SeriesView from './components/series/SeriesView';
import OnFilm from './components/onfilm/OnFilm';
import InPerson from './components/inperson/InPerson';
import ScrollToTop from './components/ScrollToTop';
// eslint-disable-next-line
import styles from './styles/main';

function App() {
  return (
    <div>
      <Nav />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/venues/:id" component={VenueView} />
          <Route path="/series/:id" component={SeriesView} />
          <Route path="/venues" component={Venues} />
          <Route path="/onfilm" component={OnFilm} />
          <Route path="/inperson" component={InPerson} />
          <Route path="/about" component={About} />
          <Route path="/:id" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Nav />
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
