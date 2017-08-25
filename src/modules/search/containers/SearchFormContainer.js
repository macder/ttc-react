import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import RouteSelectFieldContainer from './RouteSelectFieldContainer';
import DirectionSelectFieldContainer from './DirectionSelectFieldContainer';

import * as action from '../actions.js'

class SearchFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleGetRouteConfig = this.handleGetRouteConfig.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  handleGetRouteConfig(routeId) {
    this.props.dispatch(action.loadRouteConfigRequest(routeId));
  }

  render() {
    return (
      <div>
        <RouteSelectFieldContainer
          onSelect = {this.handleGetRouteConfig}
        />
        <DirectionSelectFieldContainer />
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

export default connect(mapStateToProps)(SearchFormContainer);
