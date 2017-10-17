import React from 'react';
import PropTypes from 'prop-types';

import { List as SemanticList } from 'semantic-ui-react';

const List = ({ items, isSelect, listClass }) => (
  <SemanticList
    className={listClass}
    items={items}
    selection={isSelect}
  />
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })).isRequired,
  isSelect: PropTypes.bool,
  listClass: PropTypes.string.isRequired,
};

export default (List);
