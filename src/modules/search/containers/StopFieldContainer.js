import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getStopListForDropdown } from '../selectors';
import { selectStop } from '../actions';

const mapStateToProps = state => {
  // getStopListForDropdown(state);
return {
  data: getStopListForDropdown(state),
  //fetching: isStopFieldFetching(state),
}
};

const mapDispatchToProps = dispatch => ({
  action: {
    selectStop: stop => dispatch(selectStop(stop)),
  }

});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  /*...dispatchProps,
  ...stateProps,
  historyReplace: ownProps.history.replace,
  urlParams: ownProps.match.params,
  defaultValue: ownProps.match.params.stop,
  placeholder: ownProps.placeholder,*/
});

const StopFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    //mergeProps,
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
      const { action } = props
      action.selectStop(data.value);
      // props.historyReplace(`/${props.urlParams.route}/${props.urlParams.direction}/${data.value}`);
    },
  }),
  /*lifecycle({
    componentDidMount() {
      if (this.props.defaultValue) {
        this.props.stopSelected(this.props.defaultValue);
      }
    },
  }),*/
)(DropdownField);

export default (StopFieldContainer);
