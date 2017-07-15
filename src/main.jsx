import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScheduleSelect from './containers/ScheduleSelect.jsx';

class Main extends React.Component {

  render() {
    return (
      <div>
        <h1>TTC NextBus</h1>
        <ScheduleSelect />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
