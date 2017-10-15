import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasMultiRoutePredictions } from '../components';

const getItems = (entry) => {
  if (Immutable.OrderedSet.isOrderedSet(entry)) {
    return entry.map(item => ({
      id: item.tripTag,
      text: `${item.minutes} Minutes`,
    })).toJS();
  }
  return [{
    id: entry.tripTag,
    text: `${entry.minutes} Minutes`,
  }];
};

const withMultiRouteMixedPredictions = branch(
  ({ data }) => {
    if (Immutable.List.isList(data)) {
      let isMixed = false;
      data.forEach((item) => {
        if (!Immutable.OrderedSet.isOrderedSet(item.get('prediction'))) { isMixed = true; }
      });
      return isMixed;
    }
    return false;
  },
  renderComponent(
    compose(
      mapProps(({ data }) => ({
        direction: data.map((entry, index) => ({
          id: index,
          title: entry.get('title'),
          items: getItems(entry.get('prediction')),
        })).toJS(),
      })),
      hasMultiRoutePredictions,
    )(BaseComponent),
  ),
);

export default (withMultiRouteMixedPredictions);
