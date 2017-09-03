import React from 'react';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

export default function StopSelectField(props) {

  const dataStructure = {
    text: 'title',
    value: 'id',
  };

  if (props.isVisible) {
    return (
      <AutoCompleteField
        placeholder = "Stop"
        dataSource = {props.list}
        dataStructure = {dataStructure}
        onSelected = {props.onSelected}
        inputSelected = {props.inputSelected}
        onUpdateInput = {props.onUpdateInput}
        onClear = {props.onClear}
        input = {props.input}
      />
    );
  }
  return null;
}
