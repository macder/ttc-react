import React from 'react';
import { RouteField, DirectionField } from '../containers';

const SearchForm = () => (
  <div>
    <RouteField placeholder='Route number or name' />
    <DirectionField placeholder='Direction' />
  </div>
)

export default (SearchForm);
