import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getLoadedConfigRouteIds, getRouteListForDropdown, isRouteListFetching } from '../selectors';
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
  }
});

const RouteFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    // mergeProps,
  ),
  lifecycle({
    componentDidMount() {
      const { action } = this.props
      action.requestRouteList()
    },
  }),
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
      const { action } = props
      action.selectRoute(data.value);
      //props.historyReplace(`/${data.value}`);
    },
  }),
)(DropdownField);

export default (RouteFieldContainer);
