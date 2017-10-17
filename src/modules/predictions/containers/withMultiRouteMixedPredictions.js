import Immutable from 'immutable';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { BaseComponent, hasMultiRoutePredictions } from '../components';

const getItems = (entry, selectedPrediction) => {
  if (Immutable.OrderedSet.isOrderedSet(entry)) {
    return entry.map(item => ({
      key: item.tripTag,
      header: `${item.minutes} Minutes`,
      icon: 'marker',
      value: item.tripTag,
      active: (selectedPrediction === item.tripTag),
    })).toJS();
  }
  return [{
    key: entry.tripTag,
    header: `${entry.minutes} Minutes`,
    icon: 'marker',
    value: entry.tripTag,
    active: (selectedPrediction === entry.tripTag),
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
      mapProps(({ data, onItemClick, selectedPrediction }) => ({
        direction: data.map((entry, index) => ({
          id: index,
          title: entry.get('title'),
          items: getItems(entry.get('prediction'), selectedPrediction),
        })).toJS(),
        onItemClick,
      })),
      hasMultiRoutePredictions,
    )(BaseComponent),
  ),
);

export default (withMultiRouteMixedPredictions);
