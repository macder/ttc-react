import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteField from '../../core/containers/AutoCompleteField';

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

DirectionSelectField.propTypes = {
  input: PropTypes.bool.isRequired,
  inputSelected: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  onClear: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  onUpdateInput: PropTypes.func.isRequired,
};
