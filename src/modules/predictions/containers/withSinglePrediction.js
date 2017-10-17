import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasSingeRoutePredictions } from '../components';

const withSinglePrediction = branch(
  ({ data }) => Immutable.Record.isRecord(data.get('prediction')),
  renderComponent(
    compose(
      mapProps(({ data }) => ({
        items: [{
          key: data.get('prediction').tripTag,
          header: `${data.get('prediction').minutes} Minutes`,
          icon: 'marker',
        }],
      })),
      hasSingeRoutePredictions,
    )(BaseComponent),
  ),
);

export default (withSinglePrediction);
