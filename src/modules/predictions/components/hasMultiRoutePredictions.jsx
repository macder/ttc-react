import React from 'react';
import PropTypes from 'prop-types';
import List from '../../core/components/List';

const hasMultiRoutePredictions = Component => (props) => {
  const lists = props.direction.map(direction => (
    <div key={direction.id} className='c-predictions__wrap'>
      <p>{direction.title}</p>
      <List
        items={direction.items}
        listClass='c-predictions__list'
        isSelect
      />
    </div>
  ));
  return (
    <Component>
      {lists}
    </Component>
  );
};

export default (hasMultiRoutePredictions);
