import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { RouteField, DirectionField, StopField } from '../containers';

const SearchForm = () => (
  <div className="c-search-form">
    <Router>
      <div>
        <Route
          path="/:route?"
          render={(props) => <RouteField {...props} placeholder='Route number or name' />}
        />
        <Route
          path="/:route?/:direction?"
          render={(props) => <DirectionField {...props} placeholder='Direction' />}
        />
        <Route
          path="/:route?/:direction?/:stop?"
          render={(props) => <StopField {...props} placeholder='Stop' />}
        />
      </div>
    </Router>
  </div>
);
export default (SearchForm);
