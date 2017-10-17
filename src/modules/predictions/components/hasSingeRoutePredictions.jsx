import React from 'react';
import PropTypes from 'prop-types';
import List from '../../core/components/List';

const hasSingeRoutePredictions = Component => ({ items }) => (
  <Component>
    <List
      items={items}
      listClass='c-predictions__list'
      isSelect
    />
  </Component>
);

export default (hasSingeRoutePredictions);
