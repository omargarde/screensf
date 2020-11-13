import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import VenueView from './VenueView';

const Venues = () => {
  const match = useRouteMatch();

  return (
    <div>
      <div>
        <div>Venue</div>
      </div>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <VenueView />
        </Route>
      </Switch>
    </div>
  );
};

export default Venues;
