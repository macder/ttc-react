import { branch, compose, renderComponent } from 'recompose';
import { BaseComponent, hasEmptyPredictions } from '../components';

const withEmptyPredictions = branch(
  ({ data }) => !data.size,
  renderComponent(
    compose(hasEmptyPredictions)(BaseComponent)
  )
);

export default (withEmptyPredictions);
