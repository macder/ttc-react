import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withDataOnUpdate, withSpinnerWhileLoading, hideIfNoData } from '../../core/enhancers';
import { VehicleLocation } from '../components';
// import { getLocation, isFetching } from '../selectors';
import { loadVehLocationRequest } from '../actions';

const mapStateToProps = state => ({
  data: null
});

const mapDispatchToProps = dispatch => ({
  requestFetch: (route) => dispatch(loadVehLocationRequest(route)),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withDataOnUpdate,
  withSpinnerWhileLoading,
  hideIfNoData,
);

export default enhance(VehicleLocation);
