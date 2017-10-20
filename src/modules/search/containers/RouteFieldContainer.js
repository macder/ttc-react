import { connect } from 'react-redux';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import { withRouter } from 'react-router-dom'
import { DropdownField } from '../components';
import { withDataOnInit, hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getRouteList, getSelectedRoute, isRouteListFetching } from '../selectors';
import { loadRoutesRequest, loadRouteConfigRequest, selectedRoute } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  data: getRouteList(state),
  fetching: isRouteListFetching(state),
  selected: getSelectedRoute(state),
});

const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(loadRoutesRequest()),
  requestRouteConfig: route => dispatch(loadRouteConfigRequest(route)),
  routeSelected: route => dispatch(selectedRoute(route)),
});

const valueFromURL = (isInitLoad, value, dispatchProps) => {
  if (isInitLoad && value) {
    dispatchProps.routeSelected(value);
    dispatchProps.requestRouteConfig(value);
  }
  return value;
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  requestData: (!stateProps.data && !stateProps.fetching) && (
    () => dispatchProps.requestData()
  ),
  data: stateProps.data,
  historyReplace: ownProps.history.replace,
  defaultValue: valueFromURL(
    (stateProps.data && !stateProps.selected),
    ownProps.match.params.route,
    dispatchProps,
  ),
  placeholder: ownProps.placeholder,
});

const RouteFieldContainer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withDataOnInit,
  withSpinnerWhileLoading,
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => ({
      data: data.toArray().map(item => item.toObject()),
    }),
  ),
  withHandlers({
    onChange: props => (e, data) => {
      props.routeSelected(data.value);
      props.requestRouteConfig(data.value);
      props.historyReplace('/'+ data.value);
    },
  }),
)(DropdownField);

export default (RouteFieldContainer);
