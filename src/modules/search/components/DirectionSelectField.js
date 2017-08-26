import React from 'react';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

export default function DirectionSelectField(props) {

  const dataStructure = {
    text: 'title',
    value: 'id',
  };

  return (
    <AutoCompleteField
      placeholder = "Direction"
      dataSource = {props.list}
      dataStructure = {dataStructure}
      onSelected = {props.onSelected}
    />
  );
}
