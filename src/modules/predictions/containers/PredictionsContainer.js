import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Predictions } from '../components';

const PredictionsContainer = compose()(Predictions);

export default (PredictionsContainer);
