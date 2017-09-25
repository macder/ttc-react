import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Predictions from '../components/Predictions2';
// import { getPrediction, getRoute, getStop, isFetching, isVisible } from '../selectors';
import * as selector from '../selectors';
import { loadPredictionsRequest, clearPredictions } from '../actions';



class PredictionsContainer extends React.Component {
  constructor(props) {
    super(props);
    // console.dir(props)
    // props.action.requestPredictions(7, 3223);
    // this.handleHasRouteStop = this.handleHasRouteStop.bind(this);
    this.state = {
      hasRouteStop: false
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    /*if (this.props.route && this.props.stop) {
      this.props.requestPredictionsAction(this.props.route, this.props.stop);
    }*/
  }

  /*shouldComponentUpdate(nextProps, nextState){
    // console.dir(nextState);
    console.log('shouldComponentUpdate', !(nextProps.stop === this.props.stop));

    // (nextProps.stop !== this.props.stop)

    // return nextProps.visible;
    return !(nextProps.stop === this.props.stop);

    // return (nextState.hasRouteStop !== this.state.hasRouteStop);
  }*/

  componentWillReceiveProps (nextProps){
    console.log('componentWillReceiveProps');

    /*console.log(!(!nextProps.route || !nextProps.stop));
    if(nextProps.route && nextProps.stop) {
      // console.log('HAS ROUTE AND STOP');
    }
    this.setState({
      // (nextProps.route && nextProps.stop) ? true : false;
      hasRouteStop: !(!nextProps.route || !nextProps.stop)
    });*/
  }

  /*handleHasRouteStop(route, stop) {
    // (nextProps.route && nextProps.stop) ? true : false;
    // console.log(!(!route || !stop));
    return !(!route || !stop);
  }*/

  componentWillUpdate(nextProps) {
    // console.dir(nextProps);

    console.log('componentWillUpdate');
    // this.props.action.requestPredictions(nextProps.route, nextProps.stop);

    // if (!this.props.params)

    //if (!this.props.params && nextProps.params) {
      // dispatch action to request predictions data
      // this.props.action.requestPredictions(nextProps.params.routeId, nextProps.params.stopId);
    //} else if (this.props.params && !nextProps.params) {
      // dispatch action to clear/reset predictions data/state
      // this.props.action.clear();
    //}
  }

  render() {
    // console.log('render');
    // console.dir(this.state);


    /*console.log('*-------------------')
    console.dir(this.props)
    console.log('-------------------*')*/

    // return (
    //   <Predictions />
    // )

    return null;

    /*return (
      <div>
        <List>
          <Subheader>North - 6a Bay towards Dupont</Subheader>
          <ListItem primaryText="2 minutes" />
          <ListItem primaryText="6 minutes" />
        </List>
      </div>
    );*/
    // return null;

    /*return (
      <Predictions
        isVisible={this.props.visible}
        isFetching={this.props.fetching}
        hasPredictions={this.props.hasPredictions}
        predictionMins={this.props.predictionMinutes}
      />
    );*/
  }
}

PredictionsContainer.propTypes = {
  /*action: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasPredictions: PropTypes.bool.isRequired,
  params: PropTypes.object,
  predictionMinutes: PropTypes.array,
  // predictions: PropTypes.array,
  visible: PropTypes.bool.isRequired,*/
};

/*const mapStateToProps = state => ({
  //params: getRouteStopId(state),
  // predictions: getPredictions(state),
  //predictionMinutes: getPredictionsInMinutes(state),
  //visible: isVisible(state),
  //hasPredictions: hasPredictions(state),
  //fetching: state.predictionState.fetching,
});*/

const mapStateToProps = state => {
  // console.dir(state);
  return {
    fetching: selector.isFetching(state),
    prediction: selector.getPrediction(state),
    // route: selector.getRoute(state),
    // stop: selector.getStop(state),
    visible: selector.isVisible(state),
  }

};

const mapDispatchToProps = dispatch => ({
  //action: {
    requestPredictionsAction: bindActionCreators(loadPredictionsRequest, dispatch),
    clearAction: bindActionCreators(clearPredictions, dispatch),
  //},
});

/*const mergeProps = (stateProps, actions) => {
  // console.dir(stateProps);
  // console.dir(actions);
  if (stateProps.route && stateProps.stop) {
    console.log(actions);
  }
  return stateProps;
}*/

export default connect(mapStateToProps, mapDispatchToProps, /*mergeProps*/)(PredictionsContainer);
