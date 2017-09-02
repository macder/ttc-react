import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DirectionSelectField from '../components/DirectionSelectField';

import { getDirectionList } from '../selectors'
import { selectedDirection, inputDirection } from '../actions.js'

class DirectionSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(input) {
    this.props.action.directionInput(input);
  }

  handleDirectionSelect(value) {
    const directionId = value.id;
    this.props.action.directionSelected(directionId);
    this.props.onSelect(directionId);
  }

  render() {
    return (
      <div>
        <DirectionSelectField
          list = {this.props.list}
          onSelected = {this.handleDirectionSelect}
          inputSelected = {this.props.inputSelected}
          onInput = {this.handleInput}
          input = {this.props.input}
        />
      </div>
    );
  }
}

DirectionSelectFieldContainer.propTypes = {
  action: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    inputSelected: (state.searchState.directionField.selected) ? true : false,
    input: (state.searchState.directionField.input) ? true : false,
    list: getDirectionList(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      directionSelected: bindActionCreators(selectedDirection, dispatch),
      directionInput: bindActionCreators(inputDirection, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionSelectFieldContainer);
