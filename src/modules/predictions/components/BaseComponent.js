import React from 'react';
import PropTypes from 'prop-types';

const BaseComponent = props => (
  <div className="c-predictions">
    {props.children}
  </div>
);

BaseComponent.propTypes = {
};

export default (BaseComponent);
