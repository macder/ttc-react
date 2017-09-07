import React from 'react';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

import './RouteSelectField.scss';

export default function RouteSelectField(props) {

  const dataStructure = {
    text: 'title',
    value: 'id',
  };

  return (
    <div className="c-route-select">
      <AutoCompleteField
        placeholder = "Route number or name"
        dataSource = {props.list}
        dataStructure = {dataStructure}
        onSelected = {props.onSelected}
        onClear = {props.onClear}
        onUpdateInput = {props.onUpdateInput}
      />
    </div>
  );
}
