import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import RouteSelectFieldContainer from './RouteSelectFieldContainer';
import DirectionSelectFieldContainer from './DirectionSelectFieldContainer';
import StopSelectFieldContainer from './StopSelectFieldContainer';

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
    //console.log(directionId);
  }

  render() {
    return (
      <div>
      <form>
        <RouteSelectFieldContainer
          onSelect = {this.handleGetRouteConfig}
        />
        <DirectionSelectFieldContainer
          onSelect = {this.handleGetStopList}
        />
        <StopSelectFieldContainer

        />
        </form>
      </div>
    );
  }
}

SearchFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  console.dir(state.searchState)
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
