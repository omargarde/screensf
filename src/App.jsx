import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Venues from './components/venues/Venues';
import About from './components/About';
import VenueView from './components/venues/VenueView';
import ScrollToTop from './components/ScrollToTop';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line
import styles from './styles/main';

function App() {
  return (
    <div>
      <Helmet>
          <meta charset="UTF-8"/>
          <title>SF Bay Film</title>
          <meta property="og:title" content="SF Bay Film" data-react-helmet="true"/>
          <meta property="og:url" content="http://sfbayfilm.com/" data-react-helmet="true"/>
          <meta property="og:image" content="https://storage.googleapis.com/filmcans/true-romance-banner.jpg" data-react-helmet="true"/>
          <meta property="og:description" content="SF Bay Film is a listing of daily showtimes for independent theaters, repertory cinema, and select film series and festivals in the San Francisco Bay Area." data-react-helmet="true"/>
          <meta property="og:type" content="website" data-react-helmet="true"/>
      </Helmet>
      <Nav />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/venues/:id" component={VenueView} />
          <Route path="/venues" component={Venues} />
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
