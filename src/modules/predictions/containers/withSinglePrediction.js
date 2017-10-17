import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasSingeRoutePredictions } from '../components';

const withSinglePrediction = branch(
  ({ data }) => Immutable.Record.isRecord(data.get('prediction')),
  renderComponent(
    compose(
      mapProps(({ data, onItemClick, selectedPrediction }) => ({
        items: [{
          key: data.get('prediction').tripTag,
          header: `${data.get('prediction').minutes} Minutes`,
          icon: 'marker',
          value: data.get('prediction').tripTag,
          active: (selectedPrediction === data.get('prediction').tripTag),
        }],
        onItemClick,
      })),
      hasSingeRoutePredictions,
    )(BaseComponent),
  ),
);

export default (withSinglePrediction);
