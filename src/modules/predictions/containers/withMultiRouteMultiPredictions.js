import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasMultiRoutePredictions } from '../components';

const withMultiRouteMultiPredictions = branch(
  ({ data }) => {
    if (Immutable.List.isList(data)) {
      let allMulti = true;
      data.forEach((item) => {
        if (!Immutable.OrderedSet.isOrderedSet(item.get('prediction'))) { allMulti = false; }
      });
      return allMulti;
    }
    return false;
  },
  renderComponent(
    compose(
      mapProps(({ data }) => ({
        direction: data.map((entry, index) => ({
          id: index,
          title: entry.get('title'),
          items: entry.get('prediction').map(item => ({
            id: item.tripTag,
            text: `${item.minutes} Minutes`,
          })).toJS(),
        })).toJS(),
      })),
      hasMultiRoutePredictions,
    )(BaseComponent),
  ),
);

export default (withMultiRouteMultiPredictions);
