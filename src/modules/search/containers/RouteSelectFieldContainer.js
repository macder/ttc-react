import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable'

import SelectField from '../components/SelectField';
import RouteSelectField from '../components/RouteSelectField';

import { getRouteList } from '../selectors';
import { loadRoutesRequest, selectedRoute, clearRoute, inputRoute } from '../actions';

// converts immutable to js for presentational components
const hocPropProxy = (Component) => {

  // try mapping props

  return class PropProxy extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      // console.dir(this.props);
      return (
        <Component
          {...this.props}
          data = {this.props.data.toJS()}
        />
      );
    }
  }
}

const RouteSelect = hocPropProxy(SelectField);

class RouteSelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  componentDidMount() {
    this.props.action.loadRouteList();
  }

  handleRouteSelect(value) {
    console.dir(value);
    // const routeId = value.id;
    this.props.action.routeSelected(value);
    // this.props.onSelect(value.tag);
  }

  handleClear() {
    // dispatch action to clear selected
    this.props.action.routeCleared();
  }

  handleUpdateInput(input) {
    this.props.action.routeInput(input);
    if (input === '') {
      this.props.action.routeCleared();
    }
  }

  render() {
    return (
      <RouteSelect
        data={this.props.data}
        onSelect={this.handleRouteSelect}
        onClear={this.handleClear}
        onUpdateInput={this.handleUpdateInput}
        placeholder={'Route number or name'}
      />
    );
    // return (
    //   <RouteSelect
    //     data={this.props.list}
    //     onSelected={this.handleRouteSelect}
    //     onClear={this.handleClear}
    //     onUpdateInput={this.handleUpdateInput}
    //   />
    // );
  }
}

RouteSelectFieldContainer.propTypes = {
  //action: PropTypes.object.isRequired,
  // list: PropTypes.array.isRequired,
  //onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: getRouteList(state),
});

const mapDispatchToProps = dispatch => ({
  action: {
    loadRouteList: bindActionCreators(loadRoutesRequest, dispatch),
    routeSelected: bindActionCreators(selectedRoute, dispatch),
    routeCleared: bindActionCreators(clearRoute, dispatch),
    routeInput: bindActionCreators(inputRoute, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelectFieldContainer);
