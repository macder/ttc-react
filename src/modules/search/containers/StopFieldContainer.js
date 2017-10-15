import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withHandlers, withStateHandlers } from 'recompose';
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

const StopFieldContainer = compose(
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
      props.stopSelected(data.value);
    }
  })
)(DropdownField);

export default (StopFieldContainer);
