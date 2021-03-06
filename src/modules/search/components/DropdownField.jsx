import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './DropdownField.scss';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/transition.min.css';

const DropdownField = ({ data, placeholder, onChange, defaultValue }) => (
  <div className="c-input__dropdown">
    <Dropdown
      placeholder={placeholder}
      options={data}
      onChange={onChange}
      selectOnBlur={false}
      selectOnNavigation={false}
      defaultValue={defaultValue}
      fluid
      search
      scrolling
      selection
    />
  </div>
);

export default (DropdownField);
