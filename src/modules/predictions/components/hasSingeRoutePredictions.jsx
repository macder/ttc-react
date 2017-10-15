import React from 'react';
import PropTypes from 'prop-types';
import List from '../../core/components/List';

const hasSingeRoutePredictions = Component => props => (
  <Component>
    <List items={props.items} />
  </Component>
);

export default (hasSingeRoutePredictions);
