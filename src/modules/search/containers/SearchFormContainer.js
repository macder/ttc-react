import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

import * as actions from '../actions.js'

class SearchFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
  }

  handleRouteSelect(value) {
    const action = actions.selectedRoute(value);
    this.props.dispatch(action);
  }

  render() {

    const routeList = [
      /* {text: title, value: tag} */
      {text: '5-Avenue Road', value: '5'},
      {text: '6-Bay', value: '6'},
      {text: '7-Bathurst', value: '7'},
      {text: '8-Broadview', value: '8'},
    ];

    const directionList = [
      /* {text: title, value: tag} */
      {text: 'North - 5 Avenue Rd towards Eglinton Station', value: '5_1_5B'},
      {text: 'South - 5b Avenue Rd towards Gerrard', value: '5_0_5B'},
    ];

    const stopList = [
      /* {text: title, value: stopId} */
      {text: 'Elm St At University Ave East Side', value: '1053'},
      {text: 'Gerrard St West At Elizabeth St West Side', value: '1088'},
    ];

    const dataStructure = {
      text: 'text',
      value: 'value',
    };

    return (
      <div>
        <AutoCompleteField
          placeholder = "Route number or name"
          dataSource = {routeList}
          dataStructure = {dataStructure}
          onSelected = {this.handleRouteSelect}
        />
        <AutoCompleteField
          placeholder = "Direction"
          dataSource = {directionList}
          dataStructure = {dataStructure}
        />
        <AutoCompleteField
          placeholder = "Stop"
          dataSource = {stopList}
          dataStructure = {dataStructure}
        />
      </div>
    );
  }
}

SearchFormContainer.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => {
  return {state: state.searchState}
}

export default connect(mapStateToProps)(SearchFormContainer);
