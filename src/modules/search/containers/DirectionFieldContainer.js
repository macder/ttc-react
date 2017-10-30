import { connect } from 'react-redux';
import { compose, lifecycle, onlyUpdateForKeys, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withHttpRequestError, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionListForDropdown, isDirectionListFetching, getSelectedRoute, getEntityError, directionEntity } from '../selectors';
import { selectDirection } from '../actions';
import { requestRouteConfig } from '../../../data/entities/actions';

const mapStateToProps = (state, ownProps) =>({
  data: getDirectionListForDropdown(state),
  selectedRoute: getSelectedRoute(state),
  fetching: isDirectionListFetching(state),
  error: getEntityError(directionEntity, state),
});

const mapDispatchToProps = dispatch => ({
  action: {
    selectDirection: direction => dispatch(selectDirection(direction)),
    requestRouteConfig: route => dispatch(requestRouteConfig(route)),
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...stateProps,
  historyReplace: ownProps.history.replace,
  urlParams: ownProps.match.params,
  placeholder: ownProps.placeholder,
  defaultValue: ownProps.match.params.direction,
});

const DirectionFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  lifecycle({
    componentDidMount() {
      const { action, defaultValue } = this.props;
      (defaultValue) &&
        action.selectDirection(defaultValue);
    },
    componentWillReceiveProps(nextProps) {
      const { action, selectedRoute, data, fetching, error } = nextProps;
      (selectedRoute && !data && !fetching && !error) &&
        action.requestRouteConfig(selectedRoute);
    },
  }),
  withHttpRequestError,
  onlyUpdateForKeys(['data', 'fetching']),
  withSpinnerWhileLoading,
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => ({
      data: data.toArray().map(item => item.toObject()),
    }),
  ),
  withHandlers({
    onChange: ({ action, historyReplace, urlParams }) => (e, data) => {
      action.selectDirection(data.value);
      historyReplace(`/${urlParams.route}/${data.value}`);
    },
  }),
)(DropdownField);

export default (DirectionFieldContainer);
