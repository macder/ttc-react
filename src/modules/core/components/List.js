import React from 'react';
import PropTypes from 'prop-types';
import { List as MaterialList, ListItem } from 'material-ui/List';

const List = props => {
  const items = props.items.map(value =>
    <ListItem primaryText={value.text} key={value.id} />
  );
  return (
    <MaterialList>
      {items}
    </MaterialList>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default (List);
