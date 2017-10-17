import React from 'react';
import PropTypes from 'prop-types';
import List from '../../core/components/List';

const hasSingeRoutePredictions = Component => ({ items, onItemClick }) => (
  <Component>
    <List
      items={items}
      listClass='c-predictions__list'
      onItemClick={onItemClick}
      isSelect
    />
  </Component>
);

export default (hasSingeRoutePredictions);
