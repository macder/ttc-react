import { connect } from 'react-redux';
import { compose, lifecycle, onlyUpdateForKeys, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData } from '../../core/enhancers';
import { getStopListForDropdown } from '../selectors';
import { selectStop } from '../actions';

const mapStateToProps = state => ({
  data: getStopListForDropdown(state),
});

const mapDispatchToProps = dispatch => ({
  action: {
    selectStop: stop => dispatch(selectStop(stop)),
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...stateProps,
  historyReplace: ownProps.history.replace,
  urlParams: ownProps.match.params,
  defaultValue: ownProps.match.params.stop,
  placeholder: ownProps.placeholder,
});

const StopFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  lifecycle({
    componentDidMount() {
      const { action, defaultValue } = this.props;
      (defaultValue) && action.selectStop(defaultValue);
    }
  }),
  onlyUpdateForKeys(['data', 'fetching']),
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => ({
      data: data.toArray().map(item => item.toObject()),
    }),
  ),
  withHandlers({
    onChange: ({ action, historyReplace, urlParams }) => (e, data) => {
      action.selectStop(data.value);
      historyReplace(`/${urlParams.route}/${urlParams.direction}/${data.value}`);
    },
  }),
)(DropdownField);

export default (StopFieldContainer);
