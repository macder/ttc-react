import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionList, isRouteConfigFetching } from '../selectors';
import { selectedDirection } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  data: getDirectionList(state),
  fetching: isRouteConfigFetching(state),
});

const mapDispatchToProps = dispatch => ({
  directionSelected: direction => dispatch(selectedDirection(direction)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  data: stateProps.data,
  historyReplace: ownProps.history.replace,
  urlParams: ownProps.match.params,
  defaultValue: ownProps.match.params.direction,
  placeholder: ownProps.placeholder,
});

const DirectionFieldContainer = compose(
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
      props.historyReplace('/' + props.urlParams.route + '/' + data.value);
    },
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.defaultValue) {
        this.props.directionSelected(this.props.defaultValue);
      }
    }
  }),
)(DropdownField);

export default (DirectionFieldContainer);
