import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScheduleSelect from './containers/ScheduleSelect.jsx';


ReactDOM.render(
  <div>
    <h1>TTC NextBus</h1>
    <ScheduleSelect />
  </div>, document.getElementById('root')
);
