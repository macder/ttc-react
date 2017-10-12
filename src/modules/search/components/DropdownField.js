import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import './DropdownField.scss';

const DropdownField = ({ data, placeholder, onChange }) => (
  <div className='c-input__dropdown'>
    <Dropdown
      placeholder={placeholder}
      options={data}
      onChange={onChange}
      selectOnBlur={false}
      fluid
      search
      scrolling
      selection
    />
  </div>
);

export default (DropdownField);
