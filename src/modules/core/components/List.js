import React from 'react';
import PropTypes from 'prop-types';

const List = props => {
  const items = props.items.map(value =>
    <li key={value.id}>{value.text} </li>
  );
  return (
    <ul>
      {items}
    </ul>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default (List);
