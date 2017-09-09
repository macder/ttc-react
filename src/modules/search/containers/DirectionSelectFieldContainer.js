import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DirectionSelectField from '../components/DirectionSelectField';

import { getDirectionList } from '../selectors';
import { selectedDirection, inputDirection, clearDirection } from '../actions.js';

class DirectionSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClear() {
    // dispatch action to clear selected
    this.props.action.directionCleared();
  }

  handleUpdateInput(input) {
    this.props.action.directionInput(input);
    if (input === '') {
      this.props.action.directionCleared();
    }
  }

  handleDirectionSelect(value) {
    const directionId = value.id;
    this.props.action.directionSelected(directionId);
  }

  render() {
    return (
      <DirectionSelectField
        list={this.props.list}
        onSelected={this.handleDirectionSelect.bind(this)}
        inputSelected={this.props.inputSelected}
        onUpdateInput={this.handleUpdateInput.bind(this)}
        onClear={this.handleClear.bind(this)}
        input={this.props.input}
        isVisible={this.props.visible}
      />
    );
  }
}

DirectionSelectFieldContainer.propTypes = {
  action: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  inputSelected: !!(state.searchState.directionField.selected),
  input: !!(state.searchState.directionField.input),
  list: getDirectionList(state),
  visible: state.searchState.directionField.visible,
});

const mapDispatchToProps = dispatch => ({
  action: {
    directionSelected: bindActionCreators(selectedDirection, dispatch),
    directionInput: bindActionCreators(inputDirection, dispatch),
    directionCleared: bindActionCreators(clearDirection, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DirectionSelectFieldContainer);
