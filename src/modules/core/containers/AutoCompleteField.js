import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class AutoCompleteField extends React.Component {

  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(value) {

  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AutoComplete
            floatingLabelText = {this.props.placeholder}
            dataSource = {this.props.dataSource}
            dataSourceConfig = {this.props.dataStructure}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.props.onSelected}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

AutoCompleteField.propTypes = {
  /*placeholder: PropTypes.string.isRequired,
  dataSource: PropTypes.array.isRequired,
  dataStructure: PropTypes.object.isRequired,*/
}
