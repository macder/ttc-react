import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withDataOnUpdate, withSpinnerWhileLoading, hideIfNoData } from '../../core/enhancers';
import Predictions from '../components/Predictions';
import { getPrediction, getRoute, getStop, isFetching, isVisible } from '../selectors';
import { clearPredictions, loadPredictionsRequest } from '../actions';

const shouldFetchData = props =>
  (props.route && props.stop && !props.data && !props.fetching)

const shouldClearData = props =>
  ((!props.route || !props.stop) && props.data)

const enhance = compose(
  connect(
    (state) => ({
      data: getPrediction(state),
      route: getRoute(state),
      stop: getStop(state),
      fetching: isFetching(state),
    }),
    (dispatch) => ({
      requestFetch: (route, stop) => {dispatch(loadPredictionsRequest(route, stop))},
      clearPredictions: () => {dispatch(clearPredictions())}
    }),
    (stateProps, dispatchProps, ownProps) => ({
      requestData: (shouldFetchData(stateProps))
        ? () => dispatchProps.requestFetch(stateProps.route, stateProps.stop)
        : false,
      clearData: (shouldClearData(stateProps))
        ? () => dispatchProps.clearPredictions()
        : false,
      data: stateProps.data,
      fetching: stateProps.fetching,
    })
  ),
  withDataOnUpdate,
  withSpinnerWhileLoading,
  hideIfNoData
);

export default enhance(Predictions);
