import Immutable from 'immutable';
import { branch, compose, mapProps, withHandlers, renderComponent } from 'recompose';
import { BaseComponent, hasSingeRoutePredictions } from '../components';

const withSingeRouteMultiPredictions = branch(
  ({ data }) => Immutable.OrderedSet.isOrderedSet(data.get('prediction')),
  renderComponent(
    compose(
      mapProps(({ data, onItemClick, selectedPrediction }) => ({
        items: data.get('prediction').map(item => ({
          key: item.tripTag,
          header: `${item.minutes} Minutes`,
          icon: 'marker',
          value: item.tripTag,
          active: (selectedPrediction === item.tripTag),
        })).toJS(),
        onItemClick
      })),
      hasSingeRoutePredictions,
    )(BaseComponent),
  ),
);

export default (withSingeRouteMultiPredictions);
