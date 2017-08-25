import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import DirectionSelectField from '../components/DirectionSelectField';

import * as action from '../actions.js'

class DirectionSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    //this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    // console.log('DirectionSelectFieldContainer new props');
  }

  handleDirectionSelect(value) {
    console.log(value);
    // this.props.dispatch(action.selectedDirection(value));
  }

  render() {
    const directionList = [
      /* {text: title, value: tag} */
      {text: 'North - 5 Avenue Rd towards Eglinton Station', value: '5_1_5B'},
      {text: 'South - 5b Avenue Rd towards Gerrard', value: '5_0_5B'},
    ];

    return (
      <div>
        <DirectionSelectField
          list = {directionList}
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
  console.log(state);
  return {
    // list: state.searchState.data.routeList.payload,
    // state: state.searchState.routeField
  }
}

export default connect(mapStateToProps)(DirectionSelectFieldContainer);
