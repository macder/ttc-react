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
    this.props.dispatch(action.loadRoutesRequest());
  }

  componentWillReceiveProps(nextProps) {
  }

  handleRouteSelect(value) {
    const routeId = value.id;
    this.props.dispatch(action.selectedRoute(routeId));
    this.props.onSelect(routeId);
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
  return {
    list: state.searchState.data.routeList.payload,
    // state: state.searchState.routeField
  }
}

export default connect(mapStateToProps)(RouteSelectFieldContainer);
