import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasSingeRoutePredictions } from '../components';

const withSinglePrediction = branch(
  ({ data }) => Immutable.Record.isRecord(data.get('prediction')),
  renderComponent(
    compose(
      mapProps(({ data }) => ({
        items: [{
          id: data.get('prediction').tripTag,
          text: `${data.get('prediction').minutes} Minutes`,
        }],
      })),
      hasSingeRoutePredictions,
    )(BaseComponent),
  ),
);

export default (withSinglePrediction);
