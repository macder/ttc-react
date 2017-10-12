import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionStopList, isStopFieldFetching } from '../selectors';
import { selectedStop } from '../actions';

const StopFieldContainer = compose(
  connect(
    state => ({
      data: getDirectionStopList(state),
      fetching: isStopFieldFetching(state),
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
    placeholder,
    stopSelected
  })),
  withHandlers({
    onChange: props => (event, data) => {
      props.stopSelected(data.value);
    }
  })
)(DropdownField);

export default (StopFieldContainer);
