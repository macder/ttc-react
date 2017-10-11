import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { Dropdown } from 'semantic-ui-react'
import { withDataOnInit, withDataOnUpdate, hideIfNoData, withSpinnerWhileLoading } from '../../core/enhancers';
import RouteFieldContainer from './RouteFieldContainer';
import DirectionFieldContainer from './DirectionFieldContainer';
import { BaseComponent } from '../components';
import * as selector from '../selectors';
import * as action from '../actions';

const RouteField = RouteFieldContainer;
const DirectionField = DirectionFieldContainer;

const SearchForm = () => (
  <div>
    <RouteField placeholder='Route number or name' />
    <DirectionField placeholder='Direction' />
  </div>
)

export default (SearchForm);
