import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import RouteSelectFieldContainer from './RouteSelectFieldContainer';

import * as action from '../actions.js'

class SearchFormContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log('SearchFormContainer new props');
  }

  render() {
    return (
      <div>
        <RouteSelectFieldContainer />
      </div>
    );
  }
}

SearchFormContainer.propTypes = {
  //state: PropTypes.object.isRequired,
  //dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {data: state.searchState.data}
}

export default connect(mapStateToProps)(SearchFormContainer);
