import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

export default class AutoCompleteField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [
        {textKey: 'Some Text1', valueKey: 'someFirstValue'},
        {textKey: 'Some Text2', valueKey: 'someSecondValue'},
      ],
    };

    this.dataSourceConfig = {
      text: 'textKey',
      value: 'valueKey',
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(value) {

  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AutoComplete
            hintText = {this.props.placeholder}
            dataSource = {this.state.dataSource}
            dataSourceConfig = {this.dataSourceConfig}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
