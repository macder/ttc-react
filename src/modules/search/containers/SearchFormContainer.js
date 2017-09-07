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
  }

  handleGetRouteConfig(routeId) {
    this.props.action.loadRouteConfig(routeId);
  }

  render() {
    return (
      <div className="c-search">
        <form className="c-search__form">
          <RouteSelectFieldContainer
            onSelect = {this.handleGetRouteConfig.bind(this)}
          />
          <DirectionSelectFieldContainer />
          <StopSelectFieldContainer />
        </form>
      </div>
    );
  }
}

SearchFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
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
