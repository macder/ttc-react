import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable'

import RouteSelectField from '../components/RouteSelectField';

import { getRouteList } from '../selectors';
import { loadRoutesRequest, selectedRoute, clearRoute, inputRoute } from '../actions';

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

const RouteSelect = hocPropProxy(RouteSelectField);

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
    const routeId = value.id;
    this.props.action.routeSelected(routeId);
    this.props.onSelect(routeId);
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
        data={this.props.list}
        onSelected={this.handleRouteSelect}
        onClear={this.handleClear}
        onUpdateInput={this.handleUpdateInput}
      />
    );
  }
}

RouteSelectFieldContainer.propTypes = {
  action: PropTypes.object.isRequired,
  // list: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  list: getRouteList(state),
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
