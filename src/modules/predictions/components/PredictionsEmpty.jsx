import React from 'react';
import { Segment } from 'semantic-ui-react'

import 'semantic-ui-css/components/segment.min.css';

const PredictionsEmpty = () => (
  <Segment>
    <div className="c-predictions">
      <p>There are no current predictions for your selection.</p>
    </div>
  </Segment>
)

export default (PredictionsEmpty);
