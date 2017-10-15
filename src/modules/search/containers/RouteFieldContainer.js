import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withPropsOnChange, withStateHandlers } from 'recompose';
import { DropdownField } from '../components';
import { withDataOnInit, hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getRouteList, isRouteListFetching } from '../selectors';
import { loadRoutesRequest, loadRouteConfigRequest, selectedRoute } from '../actions';

const mapStateToProps = state => ({
  data: getRouteList(state),
  fetching: isRouteListFetching(state),
});

const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(loadRoutesRequest()),
  requestRouteConfig: route => dispatch(loadRouteConfigRequest(route)),
  routeSelected: route => dispatch(selectedRoute(route)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  requestData: (!stateProps.data && !stateProps.fetching) && (
    () => dispatchProps.requestData()
  ),
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
  withPropsOnChange(
    ['data'],
    ({ data }) => ({
      data: data.toArray().map(item => item.toObject()),
    }),
  ),
  withStateHandlers({ searchQuery: '' }, {
    onSearchChange: ({ searchQuery }) => (e, data) => ({
      searchQuery: data.searchQuery,
    }),
    onClose: (state, props) => (e, data) => ({
      searchQuery: '',
    }),
  }),
  withHandlers({
    onChange: props => (e, data) => {
      props.routeSelected(data.value);
      props.requestRouteConfig(data.value);
    },
  }),
)(DropdownField);

export default (RouteFieldContainer);
