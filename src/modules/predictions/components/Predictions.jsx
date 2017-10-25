import React from 'react';
import List from '../../core/components/List';

const Predictions = (props) => {
  console.dir(props)
  return (
    <div className="c-predictions">
      <List
        items={props.data}
        listClass='c-predictions__list'
        isSelect
      />
    </div>
  );
}

export default (Predictions);
