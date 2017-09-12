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
import { getRouteList } from '../selectors';

import * as action from '../actions';

// console.dir(action);

// converts immutable to js for presentational components
const hocPropProxy = (Component) => {
  return class PropProxy extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Component
          {...this.props}
          data = {this.props.data.toJS()}
        />
      );
    }
  }
}
// data = {this.props.data.toJS()}
const RouteSelectField = hocPropProxy(SelectFieldContainer);

class SearchFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetRouteConfig = this.handleGetRouteConfig.bind(this);

    this.handleClear = this.handleClear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  componentDidMount() {
    this.props.action.loadRouteList();
  }

  componentWillUpdate(){
    console.log('SearchFormContainer update');
  }

  handleSelect(value) {
    //console.log('handleSelect', value);
    /*const routeId = value.id;
    this.props.action.routeSelected(routeId);
    this.props.onSelect(routeId);*/
  }

  handleClear(field) {
    // console.log('handleClear', field);
    // dispatch action to clear selected
    // this.props.action.routeCleared();
  }

  handleUpdateInput(value, field) {
    // console.log('handleUpdateInput', field);
    // console.log(RouteSelectField);
    /*this.props.action.routeInput(input);
    if (input === '') {
      this.props.action.routeCleared();
    }*/
  }

  handleGetRouteConfig(routeId) {
    this.props.action.loadRouteConfig(routeId);
  }

  render() {
    // console.dir(this.props);
    return (
      <div className="c-search">
        <form className="c-search__form">
          <RouteSelectField
            data={this.props.routeList}
            name={'routes'}
            action={{
              clear: this.props.action.clearRoute,
              select: this.props.action.selectedRoute,
              update: this.props.action.inputRoute,
            }}

          />
          {/*<RouteSelectFieldContainer
                      onSelect={this.handleGetRouteConfig}
                    />*/}
          {/*<DirectionSelectFieldContainer />
                    <StopSelectFieldContainer />*/}
        </form>
      </div>
    );
  }
}

/*onSelected={this.handleSelect}
            onClear={this.props.action.clearRoute}
            onChange={this.handleUpdateInput}*/

SearchFormContainer.propTypes = {
  action: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.dir(state);
  return {
    routeList: getRouteList(state),
  }

};


const mapDispatchToProps = dispatch => ({
  action: {
    loadRouteList: bindActionCreators(action.loadRoutesRequest, dispatch),
    loadRouteConfig: bindActionCreators(action.loadRouteConfigRequest, dispatch),
    clearRoute: bindActionCreators(action.clearRoute, dispatch),
    inputRoute: bindActionCreators(action.inputRoute, dispatch),
    selectedRoute: bindActionCreators(action.selectedRoute, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);
