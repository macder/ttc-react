import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionList, isRouteConfigFetching } from '../selectors';
import { selectedDirection } from '../actions';

const DirectionFieldContainer = compose(
  connect(
    state => ({
      data: getDirectionList(state),
      fetching: isRouteConfigFetching(state),
    }),
    dispatch => ({
      directionSelected: (direction) => dispatch(selectedDirection(direction)),
    }),
    (stateProps, dispatchProps, ownProps) => ({
      directionSelected: dispatchProps.directionSelected,
      data: stateProps.data,
      fetching: stateProps.fetching,
      ...ownProps
      }
    ),
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  mapProps(({ data, placeholder, directionSelected }) => ({
    data: data.toJS(),
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
