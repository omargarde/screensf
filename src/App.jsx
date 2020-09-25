import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';

// eslint-disable-next-line
import styles from './styles/main';

function App() {
  return (
    <div>
      <Nav />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
      <Nav />
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
