import React from 'react';
import PropTypes from 'prop-types';

export default function List(props) {
  const items = props.items.map(value =>
    <li>{value}</li>,
  );

  return (
    <div className="c-list">
      <ul>
        {items}
      </ul>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  // title: PropTypes.string,
};
