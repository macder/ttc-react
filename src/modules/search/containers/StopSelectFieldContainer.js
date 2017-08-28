import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StopSelectField from '../components/StopSelectField';

import { getStopList } from '../selectors'
import { selectedStop } from '../actions.js'

class StopSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleStopSelect = this.handleStopSelect.bind(this);
  }

  handleStopSelect(value) {
    // WIP - dispatch action to update state
  }

  render() {
    return (
      <div>
        <StopSelectField
          list = {this.props.list}
          onSelected = {this.handleStopSelect}
        />
      </div>
    );
  }
}

StopSelectFieldContainer.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    list: getStopList(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      stopSelected: bindActionCreators(selectedStop, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StopSelectFieldContainer);
