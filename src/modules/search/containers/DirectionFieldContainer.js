import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withPropsOnChange } from 'recompose';
import { DropdownField } from '../components';
import { hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import { getDirectionListForDropdown, isDirectionListFetching } from '../selectors';
import { selectDirection } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  data: getDirectionListForDropdown(state),
  fetching: isDirectionListFetching(state),
});

const mapDispatchToProps = dispatch => ({
  action: {
    selectDirection: route => dispatch(selectDirection(route)),
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({

});

const DirectionFieldContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    // mergeProps,
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
      action.selectDirection(data.value);
      // props.historyReplace(`/${props.urlParams.route}/${data.value}`);
    },
  }),
)(DropdownField);

export default (DirectionFieldContainer);
