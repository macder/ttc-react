import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { Dropdown } from 'semantic-ui-react'
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionStopList, isRouteConfigFetching } from '../selectors';
import { selectedStop } from '../actions';

const StopFieldContainer = compose(
  connect(
    state => ({
      data: getDirectionStopList(state),
      fetching: isRouteConfigFetching(state),
    }),
    dispatch => ({
      stopSelected: (stop) => dispatch(selectedStop(stop)),
    }),
    (stateProps, dispatchProps, ownProps) => ({
      stopSelected: dispatchProps.stopSelected,
      data: stateProps.data,
      fetching: stateProps.fetching,
      ...ownProps
      }
    ),
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  mapProps(({ data, placeholder, stopSelected }) => ({
    data: data.toJS(),
    onChange: (e,d) => stopSelected(d.value),
    placeholder
  })),
)(({ data, placeholder, onChange }) => (
  <Dropdown
    placeholder={placeholder}
    options={data}
    onChange={onChange}
    fluid
    search
    scrolling
    selection
  />
));

export default (StopFieldContainer);
