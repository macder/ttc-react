import { branch, lifecycle, renderComponent, renderNothing } from 'recompose';
import LoadingSpinner from './components/LoadingSpinner';

export const hideIfNoData = branch(
  ({ data }) => !data,
  renderNothing
);

export const withData = lifecycle({
  componentWillReceiveProps(nextProps) {
    if (nextProps.requestData) {
      nextProps.requestData();
    }
    if (nextProps.clearData) {
      nextProps.clearData();
    }
  }
});

export const withSpinnerWhileLoading = branch(
  ({ fetching }) => fetching,
  renderComponent(LoadingSpinner)
);

