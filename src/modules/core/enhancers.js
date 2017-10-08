import { branch, lifecycle, renderComponent, renderNothing } from 'recompose';
import LoadingSpinner from './components/LoadingSpinner';

export const hideIfNoData = branch(
  ({ data }) => !data,
  renderNothing
);

export const withDataOnUpdate = lifecycle({
  componentWillReceiveProps(nextProps) {
    (nextProps.requestData) && nextProps.requestData();
    (nextProps.clearData) && nextProps.clearData();
  }
});

export const withSpinnerWhileLoading = branch(
  ({ fetching }) => fetching,
  renderComponent(LoadingSpinner)
);
