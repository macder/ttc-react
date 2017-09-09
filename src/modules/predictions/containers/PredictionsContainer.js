import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Predictions from '../components/Predictions';
import { getPredictions, getPredictionsInMinutes, getRouteStopId, isVisible, hasPredictions } from '../selectors';
import { loadPredictionsRequest, clearPredictions } from '../actions';

class PredictionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    // dispatch action to request predictions data
    if (!this.props.params && nextProps.params) {
      this.props.action.requestPredictions(nextProps.params.routeId, nextProps.params.stopId);
    } else if (this.props.params && !nextProps.params) { // dispatch action to clear/reset predictions data/state
      this.props.action.clear();
    }
  }

  render() {
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
  visible: PropTypes.bool.isRequired,
  /* action: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired, */
};

const mapStateToProps = state => ({
  params: getRouteStopId(state),
  predictions: getPredictions(state),
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
