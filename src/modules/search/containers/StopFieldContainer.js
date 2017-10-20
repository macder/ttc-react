import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionStopList, getSelectedStop, isStopFieldFetching } from '../selectors';
import { selectedStop } from '../actions';

const mapStateToProps = state => ({
  data: getDirectionStopList(state),
  fetching: isStopFieldFetching(state),
  selected: getSelectedStop(state),
});

const mapDispatchToProps = dispatch => ({
  stopSelected: stop => dispatch(selectedStop(stop)),
});

const valueFromURL = (isInitLoad, value, dispatchProps) => {
  if (isInitLoad && value) {
    dispatchProps.stopSelected(value);
  }
  return value;
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  data: stateProps.data,
  historyReplace: ownProps.history.replace,
  url: ownProps.match.url,
  defaultValue: valueFromURL(
    (stateProps.data && !stateProps.selected),
    ownProps.match.params.stop,
    dispatchProps,
  ),
  placeholder: ownProps.placeholder,
});

const StopFieldContainer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withSpinnerWhileLoading,
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => ({
      data: data.toArray().map(item => item.toObject()),
    }),
  ),
  withHandlers({
    onChange: props => (e, data) => {
      props.stopSelected(data.value);
      props.historyReplace(props.url + '/' + data.value);
    },
  }),
)(DropdownField);

export default (StopFieldContainer);
