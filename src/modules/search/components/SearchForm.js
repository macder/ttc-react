import React from 'react';
import { RouteField, DirectionField, StopField } from '../containers';

const SearchForm = () => (
  <div className='c-search-form'>
    <RouteField placeholder='Route number or name' />
    <DirectionField placeholder='Direction' />
    <StopField placeholder='Stop' />
  </div>
)

export default (SearchForm);
