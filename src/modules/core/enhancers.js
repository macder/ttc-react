import { branch, compose, lifecycle, renderComponent, renderNothing } from 'recompose';
import LoadingSpinner from './components/LoadingSpinner';

export const hideIfNoData = branch(
  ({ data }) => !data,
  renderNothing,
);

export const withDataOnUpdate = lifecycle({
  componentWillReceiveProps(nextProps) {
    (nextProps.requestData) && nextProps.requestData();
    (nextProps.clearData) && nextProps.clearData();
  },
});

export const withDataOnInit = lifecycle({
  componentDidMount() {
    (this.props.requestData) && this.props.requestData();
  },
});

export const withSpinnerWhileLoading = branch(
  ({ fetching }) => fetching,
  renderComponent(LoadingSpinner),
);

/* export const withData = compose(
  withDataOnInit,
  withSpinnerWhileLoading,
  hideIfNoData,
); */
