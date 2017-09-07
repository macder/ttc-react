import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RouteSelectField from '../components/RouteSelectField';

import { getRouteList } from '../selectors'
import { loadRoutesRequest, selectedRoute, clearRoute, inputRoute } from '../actions.js'

class RouteSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.action.routeCleared();
  }

  handleUpdateInput(input) {
    this.props.action.routeInput(input);
    if(input === '') {
      this.props.action.routeCleared();
    }
  }

  render() {
    return (
      <RouteSelectField
        list = {this.props.list}
        onSelected = {this.handleRouteSelect.bind(this)}
        onClear = {this.handleClear.bind(this)}
        onUpdateInput = {this.handleUpdateInput.bind(this)}
      />
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
      routeInput: bindActionCreators(inputRoute, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelectFieldContainer);
