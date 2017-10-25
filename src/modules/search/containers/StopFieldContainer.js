import { connect } from 'react-redux';
import { compose, withHandlers, withPropsOnChange } from 'recompose';
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

const StopFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  hideIfNoData,
  withPropsOnChange(
    ['data'],
    ({ data }) => ({
      data: data.toArray().map(item => item.toObject()),
    }),
  ),
  withHandlers({
    onChange: props => (e, data) => {
      const { action } = props;
      action.selectStop(data.value);
      // props.historyReplace(`/${props.urlParams.route}/${props.urlParams.direction}/${data.value}`);
    },
  }),
)(DropdownField);

export default (StopFieldContainer);
