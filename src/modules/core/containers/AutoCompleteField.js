import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class AutoCompleteField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  /**
   * render
   *
   */
  componentWillReceiveProps(nextProps) {
    console.log('AutoComplete', nextProps)
    /*this.setState({
       input: nextProps.input
    })*/
    if(!nextProps.input){
      //this.handleClearClick();
      // this.props.onClear();

      // console.log('clear dir')
      this.setState({
         input: ''
      })
    }
  }

   handleClearClick() {
    this.setState({
       input: ''
    })
    this.props.onClear();
   }

  handleUpdateInput(value) {
    this.setState({
      input: value
    });
    this.props.onInput(value);
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
            searchText={this.state.input}
            openOnFocus={true}
            maxSearchResults={10}
            filter={AutoComplete.caseInsensitiveFilter}
          />
        </MuiThemeProvider>

        <MuiThemeProvider>
          <IconButton
            tooltip="Clear"
            onClick={this.handleClearClick.bind(this)}
          >
            <FontIcon className="material-icons" >clear</FontIcon>
          </IconButton>
        </MuiThemeProvider>
      </div>
    );
  }
}

AutoCompleteField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  dataSource: PropTypes.array.isRequired,
  dataStructure: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
}
