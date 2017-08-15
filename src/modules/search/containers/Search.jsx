import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AutoCompleteField from '../../core/containers/AutoCompleteField.jsx';


export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AutoCompleteField
          placeholder = "Route number"
        />
        <AutoCompleteField
          placeholder = "Direction"
        />
        <AutoCompleteField
          placeholder = "Stop"
        />
      </div>
    );
  }
}
