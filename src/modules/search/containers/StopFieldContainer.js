import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionStopList, isStopFieldFetching } from '../selectors';
import { selectedStop } from '../actions';

const mapStateToProps = state => ({
  data: getDirectionStopList(state),
  fetching: isStopFieldFetching(state),
});

const mapDispatchToProps = dispatch => ({
  stopSelected: (stop) => dispatch(selectedStop(stop)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  stopSelected: dispatchProps.stopSelected,
  data: stateProps.data,
  fetching: stateProps.fetching,
  ...ownProps
});

const StopFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  mapProps(({ data, placeholder, stopSelected }) => ({
    data: data.toArray().map(item => item.toObject()),
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
