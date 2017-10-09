import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasMultiRoutePredictions } from '../components';

const withMultiRouteMultiPredictions = branch(
  ({ data }) => {
    if (Immutable.List.isList(data)) {
      for (let entry of data.entries()) {
        if (!Immutable.OrderedSet.isOrderedSet(entry[1].get('prediction')))
          return false;
      }
      return true
    }
  },
  renderComponent(
    compose(
      mapProps(({data}) => ({
        direction: data.map((entry, index) => ({
          id: index,
          title: entry.get('title'),
          items: entry.get('prediction').map(item => ({
            id: item.tripTag,
            text: item.minutes + ' Minutes'
          })).toJS()
        })).toJS()
      })),
      hasMultiRoutePredictions
    )(BaseComponent)
  )
);

export default (withMultiRouteMultiPredictions);
