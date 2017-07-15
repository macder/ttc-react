import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AutoCompleteField from './containers/AutoCompleteField.jsx';

class Main extends React.Component {

  render() {
    return (
      <div>
        <h1>TTC NextBus</h1>
        <AutoCompleteField
          placeholder = "Type a route number"
        />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
