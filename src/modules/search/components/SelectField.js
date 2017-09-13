import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteField from '../../core/containers/AutoCompleteField';

// import './SelectField.scss';

export default function SelectField(props) {
  const dataStructure = {
    text: 'title',
    value: 'tag',
  };

  return (
    <div className="c-search__select-field">
      <AutoCompleteField
        placeholder={props.placeholder}
        name={props.name}
        dataSource={props.data}
        dataStructure={dataStructure}
        onSelect={props.onSelect}
        onClear={props.onClear}
        onChange={props.onUpdateInput}
        input={props.input}
      />
    </div>
  );
}

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
  input: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onUpdateInput: PropTypes.func.isRequired,
};
