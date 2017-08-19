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
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {

    const routeList = [
      {text: '5-Avenue Road', value: '5'},
      {text: '6-Bay', value: '6'},
      {text: '7-Bathurst', value: '7'},
      {text: '8-Broadview', value: '8'},
    ];

    const dataStructure = {
      text: 'text',
      value: 'value',
    };

    return (
      <div>
        <AutoCompleteField
          placeholder = "Route number"
          dataSource = {routeList}
          dataStructure = {dataStructure}
        />
        <AutoCompleteField
          placeholder = "Direction"
          dataSource = {routeList}
          dataStructure = {dataStructure}
        />
        <AutoCompleteField
          placeholder = "Stop"
          dataSource = {routeList}
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

/*function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}*/

export default connect(mapStateToProps, /*mapDispatchToProps*/)(SearchFormContainer);
