import React from 'react';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

export default function RouteSelectField(props) {

  const dataStructure = {
    text: 'title',
    value: 'id',
  };

  return (
    <AutoCompleteField
      placeholder = "Route number or name"
      dataSource = {props.list}
      dataStructure = {dataStructure}
      onSelected = {props.onSelected}
      onClear = {props.onClear}
      onUpdateInput = {props.onUpdateInput}
    />
  );
}
