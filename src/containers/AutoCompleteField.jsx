import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

export default class AutoCompleteField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(value) {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AutoComplete
            hintText = {this.props.placeholder}
            dataSource = {this.state.dataSource}
            onUpdateInput = {this.handleUpdateInput}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
