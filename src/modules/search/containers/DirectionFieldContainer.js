import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { Dropdown } from 'semantic-ui-react'
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { BaseComponent } from '../components';
import * as selector from '../selectors';
import * as action from '../actions';

const DirectionFieldContainer = compose(
  connect(
    state => ({
      data: selector.getDirectionList(state),
      fetching: selector.isRouteConfigFetching(state),
    }),
    dispatch => ({
      directionSelected: (direction) => dispatch(action.selectedDirection(direction)),
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
