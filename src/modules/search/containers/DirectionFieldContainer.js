import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { Dropdown } from 'semantic-ui-react'
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
    onChange: (e,d) => directionSelected(d.value),
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

export default (DirectionFieldContainer);
