import Immutable from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import SelectFieldContainer from './SelectFieldContainer';
import RouteSelectFieldContainer from './RouteSelectFieldContainer';
import DirectionSelectFieldContainer from './DirectionSelectFieldContainer';
import StopSelectFieldContainer from './StopSelectFieldContainer';

import SelectField from '../components/SelectField';
import {hocDataPropProxy} from '../components/hocDataPropProxy';

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


    // this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  componentDidMount() {
    this.props.action.loadRouteList();
  }

  componentWillUpdate(){
    console.log('SearchFormContainer update');
  }

  handleRouteSelect(value) {
    // console.log('handleRouteSelect', value);
    const routeTag = value.tag;
    this.props.action.selectedRoute(routeTag);
    this.props.action.loadRouteConfig(routeTag);
  }

  handleDirectionSelect(value) {
    console.log('handleDirectionSelect', value);
    // const routeTag = value.tag;
    // this.props.action.selectedRoute(routeTag);
    this.props.action.selectedDirection(value.tag);
  }

  handleStopSelect(value) {
    console.log('handleStopSelect');
  }

  handleRouteClear() {
    // console.log('handleRouteClear');
    // dispatch action to clear selected
    this.props.action.clearRoute();
  }

  handleDirectionClear() {
    // console.log('handleDirectionClear');
    // dispatch action to clear selected
    this.props.action.clearDirection();
  }

  handleStopClear() {
    console.log('handleStopClear');
  }

  // handleUpdateInput(value, field) {
  //   // console.log('handleUpdateInput', field);
  //   // console.log(RouteSelectField);
  //   /*this.props.action.routeInput(input);
  //   if (input === '') {
  //     this.props.action.routeCleared();
  //   }*/
  // }

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
        />
        <DirectionSelectField
          placeholder={"Direction"}
          onSelect={this.handleDirectionSelect}
          onClear={this.handleDirectionClear}
        />

        <StopSelectField
          placeholder={"Stop"}
          onSelect={this.handleStopSelect}
          onClear={this.handleStopClear}
        />
      </div>
    )
    // console.dir(this.props);
    /*return (
      <div className="c-search">
        <form className="c-search__form">
          <RouteSelectField
            data={this.props.routeList}
            placeholder={'Route number or name'}
            action={{
              clear: this.props.action.clearRoute,
              select: this.props.action.selectedRoute,
              update: this.props.action.inputRoute,
            }}
            onSelect={this.handleGetRouteConfig}
          />

          <DirectionSelectField
            data={this.props.directionList}
            placeholder={'Direction'}
            action={{
              clear: this.props.action.clearDirection,
              select: this.props.action.selectedDirection,
              update: this.props.action.inputDirection,
            }}
          />
        </form>
      </div>
    );*/
  }
}

/*onSelected={this.handleSelect}
            onClear={this.props.action.clearRoute}
            onChange={this.handleUpdateInput}*/

SearchFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  // console.dir(state);
  return {
    // routeInput:
    // routeList: getRouteList(state),
    // directionList: getDirectionList(state),
  }

};


const mapDispatchToProps = dispatch => ({
  action: {
    loadRouteList: bindActionCreators(action.loadRoutesRequest, dispatch),
    loadRouteConfig: bindActionCreators(action.loadRouteConfigRequest, dispatch),
    clearRoute: bindActionCreators(action.clearRoute, dispatch),
    clearDirection: bindActionCreators(action.clearDirection, dispatch),
    inputRoute: bindActionCreators(action.inputRoute, dispatch),
    selectedRoute: bindActionCreators(action.selectedRoute, dispatch),
    selectedDirection: bindActionCreators(action.selectedDirection, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);
