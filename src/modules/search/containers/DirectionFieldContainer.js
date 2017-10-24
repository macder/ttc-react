import { connect } from 'react-redux';
import { compose, lifecycle, onlyUpdateForKeys, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionListForDropdown, isDirectionListFetching, selectedRoute } from '../selectors';
import { selectDirection } from '../actions';
import { requestRouteConfig } from '../../../data/entities/actions';

const mapStateToProps = (state, ownProps) => ({
  data: getDirectionListForDropdown(state),
  selectedRoute: selectedRoute(state),
  fetching: isDirectionListFetching(state),
});

const mapDispatchToProps = dispatch => ({
  action: {
    selectDirection: direction => dispatch(selectDirection(direction)),
    requestRouteConfig: route => dispatch(requestRouteConfig(route)),
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...stateProps,
  historyReplace: ownProps.history.replace,
  urlParams: ownProps.match.params,
  placeholder: ownProps.placeholder,
  defaultValue: ownProps.match.params.direction,
});

const DirectionFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  lifecycle({
    componentDidMount() {
      const { action, defaultValue } = this.props;
      (defaultValue) &&
        action.selectDirection(defaultValue);
    },
    componentWillReceiveProps(nextProps) {
      const { action, selectedRoute, data, fetching } = nextProps;
      (selectedRoute && !data  && !fetching) &&
        action.requestRouteConfig(selectedRoute)
    },
  }),
  onlyUpdateForKeys(['data', 'fetching']),
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
      const { action, historyReplace } = props
      action.selectDirection(data.value);
      historyReplace(`/${props.urlParams.route}/${data.value}`);
    },
  }),
)(DropdownField);

export default (DirectionFieldContainer);
