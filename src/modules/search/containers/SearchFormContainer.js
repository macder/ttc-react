import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

import * as action from '../actions.js'

class SearchFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
  }

  componentWillMount() {
    if(!this.props.state.routeField.populated){
      this.props.dispatch(action.loadRoutesRequest());
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextProps);
  }

  handleRouteSelect(value) {
    this.props.dispatch(action.selectedRoute(value));
    this.props.dispatch(action.loadRouteConfigRequest(value.id));
  }

  render() {

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
      text: 'title',
      value: 'id',
    };

    return (
      <div>
        <AutoCompleteField
          placeholder = "Route number or name"
          dataSource = {this.props.state.routeList.data}
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
