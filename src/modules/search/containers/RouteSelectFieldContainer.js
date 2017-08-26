import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RouteSelectField from '../components/RouteSelectField';

import { getRouteList } from '../selectors'
import { loadRoutesRequest, selectedRoute } from '../actions.js'

class RouteSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.loadRouteList();
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('RouteSelectFieldContainer will update');
  }

  handleRouteSelect(value) {
    const routeId = value.id;
    this.props.action.routeSelected(routeId);
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
    list: getRouteList(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      loadRouteList: bindActionCreators(loadRoutesRequest, dispatch),
      routeSelected: bindActionCreators(selectedRoute, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelectFieldContainer);
