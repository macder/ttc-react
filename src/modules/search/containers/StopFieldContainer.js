import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { DropdownField } from '../components';
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
)(DropdownField);

export default (StopFieldContainer);
