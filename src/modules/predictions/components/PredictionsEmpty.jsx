import React from 'react';
import { Segment } from 'semantic-ui-react'

const PredictionsEmpty = () => (
  <Segment>
    <div className="c-predictions">
      <p>There are no current predictions for your selection.</p>
    </div>
  </Segment>
)

export default (PredictionsEmpty);
