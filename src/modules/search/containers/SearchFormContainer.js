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
    // console.dir(props);
    this.handleGetRouteConfig = this.handleGetRouteConfig.bind(this);
    this.handleGetStopList = this.handleGetStopList.bind(this);
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('SearchFormContainer will update');
  }

  componentWillReceiveProps(nextProps) {
    //console.dir(nextProps);
  }

  handleGetRouteConfig(routeId) {
    this.props.action.loadRouteConfig(routeId);
  }

  handleGetStopList(directionId) {
    console.log(directionId);
    // this.props.action.loadRouteConfig(routeId);
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
  // console.dir(state);
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
