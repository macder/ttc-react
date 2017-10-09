import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasSingeRoutePredictions } from '../components';

const withSingeRouteMultiPredictions = branch(
  ({ data }) => Immutable.OrderedSet.isOrderedSet(data.get('prediction')),
  renderComponent(
    compose(
      mapProps(({data}) => ({
        items: data.get('prediction').map(item => ({
          id: item.tripTag,
          text: item.minutes + ' Minutes'
        })).toJS()
      })),
      hasSingeRoutePredictions
    )(BaseComponent)
  )
);

export default (withSingeRouteMultiPredictions);
