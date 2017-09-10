import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Predictions from '../components/Predictions';
import { getPredictionsInMinutes, getRouteStopId, isVisible, hasPredictions } from '../selectors';
import { loadPredictionsRequest, clearPredictions } from '../actions';

class PredictionsContainer extends React.Component {
  constructor(props) {
    super(props);
    props.action.requestPredictions(2, 2);
  }

  componentWillUpdate(nextProps) {
    if (!this.props.params && nextProps.params) {
      // dispatch action to request predictions data
      // this.props.action.requestPredictions(nextProps.params.routeId, nextProps.params.stopId);
    } else if (this.props.params && !nextProps.params) {
      // dispatch action to clear/reset predictions data/state
      // this.props.action.clear();
    }
  }

  render() {
    /*console.log('*-------------------')
    console.dir(this.props)
    console.log('-------------------*')*/
    return (
      <Predictions
        isVisible={this.props.visible}
        isFetching={this.props.fetching}
        hasPredictions={this.props.hasPredictions}
        predictionMins={this.props.predictionMinutes}
      />
    );
  }
}

PredictionsContainer.propTypes = {
  action: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasPredictions: PropTypes.bool.isRequired,
  params: PropTypes.object,
  predictionMinutes: PropTypes.array,
  // predictions: PropTypes.array,
  visible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  params: getRouteStopId(state),
  // predictions: getPredictions(state),
  predictionMinutes: getPredictionsInMinutes(state),
  visible: isVisible(state),
  hasPredictions: hasPredictions(state),
  fetching: state.predictionState.fetching,
});

const mapDispatchToProps = dispatch => ({
  action: {
    requestPredictions: bindActionCreators(loadPredictionsRequest, dispatch),
    clear: bindActionCreators(clearPredictions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PredictionsContainer);
