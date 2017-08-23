import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import RouteSelectField from '../components/RouteSelectField';

import * as action from '../actions.js'

class RouteSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div>
        <RouteSelectField
          list = {this.props.list}
        />
      </div>
    );
  }
}

RouteSelectFieldContainer.propTypes = {
  //state: PropTypes.object.isRequired,
  //dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {state: state.searchState.routeField}
}

export default connect(mapStateToProps)(RouteSelectFieldContainer);
