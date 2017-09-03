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
  }

  componentWillReceiveProps(nextProps) {
    // console.dir(nextProps);
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
