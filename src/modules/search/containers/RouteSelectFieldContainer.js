import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import RouteSelectField from '../components/RouteSelectField';

import * as action from '../actions.js'

class RouteSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleRouteSelect(value) {
    console.log(value);
    // this.props.dispatch(action.selectedRoute(value));
  }

  render() {
    return (
      <div>
        <RouteSelectField
          list = {this.props.list}
          onSelected = {this.handleRouteSelect}
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
