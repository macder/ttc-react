import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SelectFieldContainer from './SelectFieldContainer';
import { hocDataPropProxy } from '../components/hocDataPropProxy';
import { getRouteList, getDirectionList, getDirectionStopList, isRouteFieldVisible, isDirectionFieldVisible, isStopFieldVisible } from '../selectors';
import * as action from '../actions';

const RouteSelectField = hocDataPropProxy(SelectFieldContainer, getRouteList);
const DirectionSelectField = hocDataPropProxy(SelectFieldContainer, getDirectionList);
const StopSelectField = hocDataPropProxy(SelectFieldContainer, getDirectionStopList);

class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetRouteConfig = this.handleGetRouteConfig.bind(this);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
    this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
    this.handleStopSelect = this.handleStopSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.loadRouteList();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('SearchFormContainer componentWillUpdate');
  }

  handleRouteSelect(value) {
    const routeTag = value.tag;
    this.props.action.selectedRoute(routeTag);
    this.props.action.loadRouteConfig(routeTag);
  }

  handleDirectionSelect(value) {
    this.props.action.selectedDirection(value.tag);
  }

  handleStopSelect(value) {
    this.props.action.selectedStop(value.tag);
  }

  handleGetRouteConfig(route) {
    this.props.action.loadRouteConfig(route.tag);
  }

  render() {
    console.log('SearchFormContainer rendered');
    return (
      <div className="c-search">
        <RouteSelectField
          placeholder={'Route number or name'}
          onSelect={this.handleRouteSelect}
          onClear={this.props.action.clearRoute}
          isVisible={this.props.routeVisible}
        />
        <DirectionSelectField
          placeholder={"Direction"}
          onSelect={this.handleDirectionSelect}
          onClear={this.props.action.clearDirection}
          isVisible={this.props.directionVisible}
        />

        <StopSelectField
          placeholder={"Stop"}
          onSelect={this.handleStopSelect}
          onClear={this.props.action.clearStop}
          isVisible={this.props.stopVisible}
        />
      </div>
    )
  }
}

SearchFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
  routeVisible: PropTypes.bool.isRequired,
  directionVisible: PropTypes.bool.isRequired,
  stopVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    routeVisible: isRouteFieldVisible(state),
    directionVisible: isDirectionFieldVisible(state),
    stopVisible: isStopFieldVisible(state),
  }

};

const mapDispatchToProps = dispatch => ({
  action: {
    loadRouteList: bindActionCreators(action.loadRoutesRequest, dispatch),
    loadRouteConfig: bindActionCreators(action.loadRouteConfigRequest, dispatch),
    clearRoute: bindActionCreators(action.clearRoute, dispatch),
    clearDirection: bindActionCreators(action.clearDirection, dispatch),
    clearStop: bindActionCreators(action.clearStop, dispatch),
    selectedRoute: bindActionCreators(action.selectedRoute, dispatch),
    selectedDirection: bindActionCreators(action.selectedDirection, dispatch),
    selectedStop: bindActionCreators(action.selectedStop, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);
