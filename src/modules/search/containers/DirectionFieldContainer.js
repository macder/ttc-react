import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionList, getSelectedDirection, isRouteConfigFetching } from '../selectors';
import { selectedDirection } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  data: getDirectionList(state),
  fetching: isRouteConfigFetching(state),
  selected: getSelectedDirection(state),
});

const mapDispatchToProps = dispatch => ({
  directionSelected: direction => dispatch(selectedDirection(direction)),
});

const valueFromURL = (isInitLoad, value, dispatchProps) => {
  if (isInitLoad && value) {
    dispatchProps.directionSelected(value);
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
    ownProps.match.params.direction,
    dispatchProps,
  ),
});

const DirectionFieldContainer = compose(
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
      props.directionSelected(data.value);
      props.historyReplace(props.url + '/' + data.value);
    },
  }),
)(DropdownField);

export default (DirectionFieldContainer);
