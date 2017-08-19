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
    /*console.log(props);
    const action = actions.loadRoutesRequest();
    props.dispatch(action);*/

  }

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps);
  }

  render() {
    return (
      <div>
        <AutoCompleteField
          placeholder = "Route number"
        />
        <AutoCompleteField
          placeholder = "Direction"
        />
        <AutoCompleteField
          placeholder = "Stop"
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
