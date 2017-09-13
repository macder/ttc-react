import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable'

import SelectField from '../components/SelectField';

import { getRouteList } from '../selectors';
// import { loadRoutesRequest, selectedRoute, clearRoute, inputRoute } from '../actions';

export default class SelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);

    this.state = {
      input: null,
    };
  }

  componentDidMount() {
    // this.props.action.loadRouteList();
  }

  handleSelect(value) {
    // console.log('handleSelect', value);
    /*this.props.action.select(value);
    this.props.onSelect(value);*/

    //if(this.props.onSelect){

    //}
    /*const routeId = value.id;
    this.props.action.routeSelected(routeId);
    this.props.onSelect(routeId);*/
  }

  handleClear() {
    console.log('handleClear');
    this.props.onClear();
    this.setState({
      input: ''
    });
  }

  handleUpdateInput(input) {
    this.setState({ input });

    if(input === ''){
      this.props.onClear();
    }
    //console.dir(this.state);
    //console.log('handleUpdateInput', input);
    // console.log(RouteSelectField);
    /*this.props.action.update(input);
    if (input === '') {
      this.props.action.clear();
    }*/
  }

  render() {
    /*console.log('#--------------------');
    console.dir(this.props);
    console.log('--------------------#');*/
    // console.dir(this.state);
    return (
      <SelectField
        data={this.props.data}
        placeholder={this.props.placeholder}
        onSelect={this.props.onSelect}
        onClear={this.handleClear}
        onUpdateInput={this.handleUpdateInput}
        input={this.state.input}
      />
    );
  }
}

SelectFieldContainer.propTypes = {
  //action: PropTypes.object.isRequired,
  // list: PropTypes.array.isRequired,
  //onSelect: PropTypes.func.isRequired,
};

/*const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelectFieldContainer);*/
