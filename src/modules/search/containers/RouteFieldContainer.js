import { connect } from 'react-redux';
import { compose, lifecycle, onlyUpdateForKeys, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getRouteListForDropdown, isRouteListFetching } from '../selectors';
import { selectRoute } from '../actions';
import { requestRouteList } from '../../../data/entities/actions';

const mapStateToProps = (state, ownProps) => ({
  data: getRouteListForDropdown(state),
  fetching: isRouteListFetching(state),
});

const mapDispatchToProps = dispatch => ({
  action: {
    requestRouteList: () => dispatch(requestRouteList()),
    selectRoute: route => dispatch(selectRoute(route)),
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...stateProps,
  historyReplace: ownProps.history.replace,
  placeholder: ownProps.placeholder,
  defaultValue: ownProps.match.params.route,
});

const RouteFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  lifecycle({
    componentDidMount() {
      const { action, defaultValue } = this.props;
      action.requestRouteList();
      (defaultValue) && action.selectRoute(defaultValue);
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
    onChange: ({ action, historyReplace }) => (e, data) => {
      action.selectRoute(data.value);
      historyReplace(`/${data.value}`);
    },
  }),
)(DropdownField);

export default (RouteFieldContainer);
