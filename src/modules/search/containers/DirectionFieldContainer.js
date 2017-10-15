import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers, withStateHandlers } from 'recompose';
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

const DirectionFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  mapProps(props => ({
    ...props,
    data: props.data.toArray().map(item => item.toObject()),
  })),
  withStateHandlers({ searchQuery: '' },{
    onSearchChange: ({ searchQuery }) => (event, data) => ({
      searchQuery: data.searchQuery
    }),
    onClose: (state, props) => (e, data) => ({
      searchQuery: ''
    })
  }),
  withHandlers({
    onChange: props => (event, data) => {
      props.directionSelected(data.value);
    }
  })
)(DropdownField);

export default (DirectionFieldContainer);
