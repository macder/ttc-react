import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteField from '../../core/containers/AutoCompleteField';

import './RouteSelectField.scss';

export default function RouteSelectField(props) {
  const dataStructure = {
    text: 'title',
    value: 'tag',
  };

  return (
    <div className="c-route-select">
      <AutoCompleteField
        placeholder="Route number or name"
        dataSource={props.data}
        dataStructure={dataStructure}
        onSelected={props.onSelected}
        onClear={props.onClear}
        onUpdateInput={props.onUpdateInput}
      />
    </div>
  );
}

RouteSelectField.propTypes = {
  data: PropTypes.array.isRequired,
  onClear: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  onUpdateInput: PropTypes.func.isRequired,
};
