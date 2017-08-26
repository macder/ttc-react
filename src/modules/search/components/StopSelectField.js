import React from 'react';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

export default function StopSelectField(props) {

  const dataStructure = {
    text: 'title',
    value: 'id',
  };

  const list = [];

  return (
    <AutoCompleteField
      placeholder = "Stop"
      dataSource = {list}
      dataStructure = {dataStructure}
      onSelected = {props.onSelected}
    />
  );
}
