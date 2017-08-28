import React from 'react';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

export default function StopSelectField(props) {

  const dataStructure = {
    text: 'title',
    value: 'id',
  };

  return (
    <AutoCompleteField
      placeholder = "Stop"
      dataSource = {props.list}
      dataStructure = {dataStructure}
      onSelected = {props.onSelected}
    />
  );
}
