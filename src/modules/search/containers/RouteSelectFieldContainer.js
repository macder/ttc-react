import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RouteSelectField from '../components/RouteSelectField';

import { getRouteList } from '../selectors'
import { loadRoutesRequest, selectedRoute, clearRoute } from '../actions.js'

class RouteSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    this.props.action.loadRouteList();
  }

  handleRouteSelect(value) {
    const routeId = value.id;
    this.props.action.routeSelected(routeId);
    this.props.onSelect(routeId);
  }

  handleClear() {
    // dispatch action to clear selected
    console.log('clear route');
    this.props.action.routeCleared();
  }

  render() {
    return (
      <div>
        <RouteSelectField
          list = {this.props.list}
          onSelected = {this.handleRouteSelect}
          onClear = {this.handleClear}
        />
      </div>
    );
  }
}

RouteSelectFieldContainer.propTypes = {
  action: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    list: getRouteList(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      loadRouteList: bindActionCreators(loadRoutesRequest, dispatch),
      routeSelected: bindActionCreators(selectedRoute, dispatch),
      routeCleared: bindActionCreators(clearRoute, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelectFieldContainer);
