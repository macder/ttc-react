import { branch, lifecycle, renderComponent, renderNothing } from 'recompose';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

export const hideIfNoData = branch(
  ({ data }) => !data,
  renderNothing,
);

export const withDataOnUpdate = lifecycle({
  componentWillReceiveProps(nextProps) {
    if (nextProps.requestData) nextProps.requestData();
    if (nextProps.clearData) nextProps.clearData();
  },
});

export const withDataOnInit = lifecycle({
  componentDidMount() {
    if (this.props.requestData) this.props.requestData();
  },
});

export const withSpinnerWhileLoading = branch(
  ({ fetching }) => fetching,
  renderComponent(LoadingSpinner),
);

export const withHttpRequestError = branch(
  ({ error }) => !!(error),
  renderComponent(ErrorMessage),
);
