import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StopSelectField from '../components/StopSelectField';

import { getStopList } from '../selectors'
import { selectedStop, inputStop, clearStop } from '../actions.js'

class StopSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClear() {
    // dispatch action to clear selected
    this.props.action.stopCleared();
  }

  handleUpdateInput(input) {
    this.props.action.stopInput(input);
  }

  handleStopSelect(value) {
    this.props.action.stopSelected(value.id);
  }

  render() {
    return (
      <div>
        <StopSelectField
          list = {this.props.list}
          onSelected = {this.handleStopSelect.bind(this)}
          inputSelected = {this.props.inputSelected}
          onUpdateInput = {this.handleUpdateInput.bind(this)}
          onClear = {this.handleClear.bind(this)}
          input = {this.props.input}
        />
      </div>
    );
  }
}

StopSelectFieldContainer.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    inputSelected: (state.searchState.stopField.selected) ? true : false,
    input: (state.searchState.stopField.input) ? true : false,
    list: getStopList(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      stopSelected: bindActionCreators(selectedStop, dispatch),
      stopInput: bindActionCreators(inputStop, dispatch),
      stopCleared: bindActionCreators(clearStop, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StopSelectFieldContainer);
