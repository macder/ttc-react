import React from 'react';
import AutoCompleteField from '../../core/containers/AutoCompleteField.js';

import './DirectionSelectField.scss';

export default function DirectionSelectField(props) {
  const dataStructure = {
    text: 'title',
    value: 'id',
  };

  if (props.isVisible) {
    return (
      <div className="c-direction-select">
        <AutoCompleteField
          placeholder="Direction"
          dataSource={props.list}
          dataStructure={dataStructure}
          onSelected={props.onSelected}
          inputSelected={props.inputSelected}
          onUpdateInput={props.onUpdateInput}
          onClear={props.onClear}
          input={props.input}
        />
      </div>
    );
  }
  return null;
}
