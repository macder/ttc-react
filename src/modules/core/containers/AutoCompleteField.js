import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import LoadingSpinner from '../components/LoadingSpinner';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class AutoCompleteField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.input){
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
    this.props.onUpdateInput(value);
  }

  render() {
    if(this.props.dataSource.length > 0) {

      const clearButtonStyle = {
        position: 'absolute',
        right: 0,
        marginTop: 24,
      }

      const iconStyle = {
        color: '#ccc'
      }

      return (
        <div>
          <AutoComplete
            floatingLabelText = {this.props.placeholder}
            dataSource = {this.props.dataSource}
            dataSourceConfig = {this.props.dataStructure}
            onUpdateInput={this.handleUpdateInput.bind(this)}
            onNewRequest={this.props.onSelected}
            searchText={this.state.input}
            openOnFocus={true}
            fullWidth={true}
            maxSearchResults={10}
            filter={AutoComplete.caseInsensitiveFilter}
          />

          <IconButton
            tooltip="Clear"
            onClick={this.handleClearClick.bind(this)}
            iconStyle={iconStyle}
            style={clearButtonStyle}
          >
            <FontIcon className="material-icons" >clear</FontIcon>
          </IconButton>
        </div>
      );
    }

    return (
      <LoadingSpinner />
    );

  }
}

AutoCompleteField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  dataSource: PropTypes.array.isRequired,
  dataStructure: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
}
