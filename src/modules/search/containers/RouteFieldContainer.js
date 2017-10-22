import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getRouteListForDropdown, isRouteListFetching } from '../selectors';
import { selectRoute } from '../actions';
import { requestRouteConfig, requestRouteList } from '../../../data/entities/actions';

const mapStateToProps = (state, ownProps) => ({
  data: getRouteListForDropdown(state),
  fetching: isRouteListFetching(state),
});

const mapDispatchToProps = dispatch => ({
  action: {
    requestRouteList: () => dispatch(requestRouteList()),
    selectRoute: route => dispatch(selectRoute(route)),
    requestRouteConfig: route => dispatch(requestRouteConfig(route)),
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({

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
      action.requestRouteConfig(data.value);
      //props.historyReplace(`/${data.value}`);
    },
  }),
)(DropdownField);

export default (RouteFieldContainer);
