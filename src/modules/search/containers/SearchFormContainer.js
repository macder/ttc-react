import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import RouteSelectFieldContainer from './RouteSelectFieldContainer';
import DirectionSelectFieldContainer from './DirectionSelectFieldContainer';
import StopSelectFieldContainer from './StopSelectFieldContainer';

import { loadRouteConfigRequest } from '../actions';

class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetRouteConfig = this.handleGetRouteConfig.bind(this);
  }

  componentWillUpdate(){
    console.log('SearchFormContainer update');
  }

  handleGetRouteConfig(routeId) {
    this.props.action.loadRouteConfig(routeId);
  }

  render() {
    return (
      <div className="c-search">
        <form className="c-search__form">
          <RouteSelectFieldContainer
            onSelect={this.handleGetRouteConfig}
          />
          {/*<DirectionSelectFieldContainer />
                    <StopSelectFieldContainer />*/}
        </form>
      </div>
    );
  }
}

SearchFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  action: {
    loadRouteConfig: bindActionCreators(loadRouteConfigRequest, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);
