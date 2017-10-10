import React from 'react';
import PropTypes from 'prop-types';

const BaseComponent = props => {
  console.dir('BaseComponent render')
  return(
    <div className="c-search">
      {props.children}
    </div>
  );
}

BaseComponent.propTypes = {
};

export default (BaseComponent);