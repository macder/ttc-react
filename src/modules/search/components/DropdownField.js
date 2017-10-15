import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import './DropdownField.scss';

const DropdownField = ({ data, placeholder, onChange, onSearchChange, searchQuery, onClose }) => (
  <div className='c-input__dropdown'>
    <Dropdown
      placeholder={placeholder}
      options={data}
      onChange={onChange}
      onClose={onClose}
      onSearchChange={onSearchChange}
      searchQuery={searchQuery}
      selectOnBlur={false}
      selectOnNavigation={false}
      fluid
      search
      scrolling
      selection
    />
  </div>
);
export default (DropdownField);
