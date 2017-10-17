import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react'
import './BaseComponent.scss';

const BaseComponent = props => (
  <Segment>
    <div className="c-predictions">
      {props.children}
    </div>
  </Segment>
);

BaseComponent.propTypes = {
};

export default (BaseComponent);
