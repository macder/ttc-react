import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { DropdownField } from '../components';
import { withDataOnInit, hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getRouteList, isRouteListFetching } from '../selectors';
import { loadRoutesRequest, loadRouteConfigRequest, selectedRoute } from '../actions';

const mapStateToProps = state => ({
  data: getRouteList(state),
  fetching: isRouteListFetching(state),
});

const mapDispatchToProps = dispatch => ({
  requestFetch: () => dispatch(loadRoutesRequest()),
  requestRouteConfig: (route) => dispatch(loadRouteConfigRequest(route)),
  routeSelected: (route) => dispatch(selectedRoute(route)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  requestData: (!stateProps.data && !stateProps.fetching) && (
    () => dispatchProps.requestFetch()
  ),
  requestRouteConfig: dispatchProps.requestRouteConfig,
  routeSelected: dispatchProps.routeSelected,
  fetching: stateProps.fetching,
  data: stateProps.data,
  ...ownProps
});

const RouteFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withDataOnInit,
  withSpinnerWhileLoading,
  hideIfNoData,
  mapProps(({ data, placeholder, requestRouteConfig, routeSelected }) => ({
    data: data.toArray().map(item => item.toObject()),
    placeholder,
    routeSelected,
    requestRouteConfig,
  })),
  withHandlers({
    onChange: props => (event, data) => {
      props.routeSelected(data.value);
      props.requestRouteConfig(data.value);
    }
  })
)(DropdownField);

export default (RouteFieldContainer);
