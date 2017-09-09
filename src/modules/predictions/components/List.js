import React from 'react';
import PropTypes from 'prop-types';

export default function List(props) {
  const items = props.items.map(value =>
    <li>{value}</li>,
  );

  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
        {items}
      </ul>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
};
