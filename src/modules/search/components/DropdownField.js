import React from 'react';
import { Dropdown } from 'semantic-ui-react'

const DropdownField = ({ data, placeholder, onChange }) => (
  <Dropdown
    placeholder={placeholder}
    options={data}
    onChange={onChange}
    fluid
    search
    scrolling
    selection
  />
);

export default (DropdownField);
