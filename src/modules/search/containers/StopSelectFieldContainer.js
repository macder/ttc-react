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
    //console.dir(props);
    this.handleStopSelect = this.handleStopSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.dir(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('StopSelectFieldContainer will update');
  }

  handleStopSelect(value) {
    console.log(value);
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
