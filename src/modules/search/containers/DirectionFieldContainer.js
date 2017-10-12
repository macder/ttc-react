import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionList, isRouteConfigFetching } from '../selectors';
import { selectedDirection } from '../actions';

const mapStateToProps = state => ({
  data: getDirectionList(state),
  fetching: isRouteConfigFetching(state),
});

const mapDispatchToProps = dispatch => ({
  directionSelected: (direction) => dispatch(selectedDirection(direction)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  directionSelected: dispatchProps.directionSelected,
  data: stateProps.data,
  fetching: stateProps.fetching,
  ...ownProps
});

const DirectionFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  mapProps(({ data, placeholder, directionSelected }) => ({
    data: data.toArray().map(item => item.toObject()),
    placeholder,
    directionSelected
  })),
  withHandlers({
    onChange: props => (event, data) => {
      props.directionSelected(data.value);
    }
  })
)(DropdownField);

export default (DirectionFieldContainer);
