import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SelectFieldContainer from './SelectFieldContainer';
import { hocDataPropProxy } from '../components/hocDataPropProxy';
import { getRouteList, getDirectionList, getDirectionStopList } from '../selectors';
import * as action from '../actions';

const RouteSelectField = hocDataPropProxy(SelectFieldContainer, getRouteList);
const DirectionSelectField = hocDataPropProxy(SelectFieldContainer, getDirectionList);
const StopSelectField = hocDataPropProxy(SelectFieldContainer, getDirectionStopList);

class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetRouteConfig = this.handleGetRouteConfig.bind(this);
    this.handleRouteClear = this.handleRouteClear.bind(this);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
    this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
    this.handleDirectionClear = this.handleDirectionClear.bind(this);
    this.handleStopClear = this.handleStopClear.bind(this);
    this.handleStopSelect = this.handleStopSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.loadRouteList();
  }

  componentWillUpdate(){
    console.log('SearchFormContainer update');
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

  handleRouteClear() {
    this.props.action.clearRoute();
  }

  handleDirectionClear() {
    this.props.action.clearDirection();
  }

  handleStopClear() {
    this.props.action.clearStop();
  }

  handleGetRouteConfig(route) {
    this.props.action.loadRouteConfig(route.tag);
  }

  render() {
    return (
      <div className="c-search">
        <RouteSelectField
          placeholder={'Route number or name'}
          onSelect={this.handleRouteSelect}
          onClear={this.handleRouteClear}
          isVisible={this.props.routeVisible}
        />
        <DirectionSelectField
          placeholder={"Direction"}
          onSelect={this.handleDirectionSelect}
          onClear={this.handleDirectionClear}
          isVisible={this.props.directionVisible}
        />

        <StopSelectField
          placeholder={"Stop"}
          onSelect={this.handleStopSelect}
          onClear={this.handleStopClear}
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
    routeVisible: state.getIn(['searchState', 'routeField', 'visible']),
    directionVisible: state.getIn(['searchState', 'directionField', 'visible']),
    stopVisible: state.getIn(['searchState', 'stopField', 'visible']),
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
