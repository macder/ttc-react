import React from 'react';
import { Segment } from 'semantic-ui-react'
import List from '../../core/components/List';

const Predictions = ({ data }) => (
  <Segment>
    <div className="c-predictions">
      <List
        items={data}
        listClass='c-predictions__list'
        isSelect
      />
    </div>
  </Segment>
);

export default (Predictions);
