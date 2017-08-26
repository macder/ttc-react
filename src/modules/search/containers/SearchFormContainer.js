import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import RouteSelectFieldContainer from './RouteSelectFieldContainer';
import DirectionSelectFieldContainer from './DirectionSelectFieldContainer';

import { loadRouteConfigRequest } from '../actions.js'

class SearchFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleGetRouteConfig = this.handleGetRouteConfig.bind(this);
    this.handleGetStopList = this.handleGetStopList.bind(this);
  }

  handleGetRouteConfig(routeId) {
    this.props.action.loadRouteConfig(routeId);
  }

  handleGetStopList(directionId) {
    console.log(directionId);
  }

  render() {
    return (
      <div>
        <RouteSelectFieldContainer
          onSelect = {this.handleGetRouteConfig}
        />
        <DirectionSelectFieldContainer
          onSelect = {this.handleGetStopList}
        />
      </div>
    );
  }
}

SearchFormContainer.propTypes = {
  // data: PropTypes.object.isRequired,
  //dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      loadRouteConfig: bindActionCreators(loadRouteConfigRequest, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);
