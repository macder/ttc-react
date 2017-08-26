import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import DirectionSelectField from '../components/DirectionSelectField';

import { getDirectionList } from '../selectors'
import { selectedDirection} from '../actions.js'

class DirectionSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
  }

  componentDidMount() {
    //console.dir(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //console.dir(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('DirectionSelectFieldContainer will update');
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
        />
      </div>
    );
  }
}

DirectionSelectFieldContainer.propTypes = {
  //state: PropTypes.object.isRequired,
  //dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    list: getDirectionList(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      directionSelected: bindActionCreators(selectedDirection, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionSelectFieldContainer);
