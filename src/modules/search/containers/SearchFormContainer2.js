import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dropdown } from 'semantic-ui-react'
import { withDataOnInit, hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { BaseComponent } from '../components';
import * as selector from '../selectors';
import * as action from '../actions';

const countryOptions = [
  {key: 'ca', value: 'ca', text: 'Canada'},
  {key: 'pl', value: 'pl', text: 'Poland'},
];

const mapStateToProps = state => ({
  data: selector.getRouteList(state),
  fetching: selector.isRouteFieldFetching(state),
});

const mapDispatchToProps = dispatch => ({
  requestFetch: () => dispatch(action.loadRoutesRequest()),
});

const shouldFetchData = props =>
  (!props.data && !props.fetching)

const mergeProps = (stateProps, dispatchProps) => ({
  requestData: (shouldFetchData(stateProps)) && (
    () => dispatchProps.requestFetch()
  ),
  fetching: stateProps.fetching,
  data: stateProps.data,
  placeholder: 'Route number or name',

});

const RouteField = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withDataOnInit,
  withSpinnerWhileLoading,
  hideIfNoData,
)(({ placeholder }) => (
  <Dropdown placeholder={placeholder} fluid search selection options={countryOptions} />
));

const SearchForm = () => (
  <div>
    <RouteField />
  </div>
)

export default (SearchForm);
