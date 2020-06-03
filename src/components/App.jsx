import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Nav from './Nav.jsx';
import Submit from './Submit.jsx';
import styles from '../styles/main';

function App() {
  return (
    <div>
      <Nav />
      <div className={styles.wrapper}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/submit" component={Submit} />
        </Switch>
      </div>
      <Nav />
    </div>
  );
}

export default App;
