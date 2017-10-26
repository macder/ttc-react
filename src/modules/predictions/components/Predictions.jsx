import React from 'react';
import { Segment } from 'semantic-ui-react'
import List from '../../core/components/List';

const Predictions = ({ data }) => (
  <Segment>
    <div className="c-predictions">
    {data.map(value =>
      <div key={value.key}>
        <p>{value.title}</p>
        <List
          items={value.prediction}
          listClass='c-predictions__list'
          isSelect
        />
      </div>
    )}

    </div>
  </Segment>
);

export default (Predictions);
