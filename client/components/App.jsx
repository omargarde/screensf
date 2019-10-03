import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Nav from './Nav.jsx';
import Submit from './Submit.jsx';


function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/submit" component={Submit} />
      </Switch>
      <Nav />
    </div>
  );
}

export default App;
