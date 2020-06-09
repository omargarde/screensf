import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Submit from './components/Submit';
// eslint-disable-next-line
import styles from './styles/main';

function App() {
  return (
    <div>
      <Nav />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/submit" component={Submit} />
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
