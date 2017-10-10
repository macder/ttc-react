import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// converts immutable to js for presentational components
export const hocDataPropProxy = (Component, dataSelector, visibleSelector) => {
  class DataPropProxy extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Component
          {...this.props}
          isVisible={this.props.visible}
          data={this.props.data.toJS()}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    visible: visibleSelector(state),
    data: dataSelector(state),
  });
  return connect(mapStateToProps)(DataPropProxy);
}