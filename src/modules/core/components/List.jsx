import React from 'react';
import PropTypes from 'prop-types';

import { List as SemanticList } from 'semantic-ui-react';
import 'semantic-ui-css/components/list.min.css';

const List = ({ items, isSelect, listClass, onItemClick }) => (
  <SemanticList
    className={listClass}
    items={items}
    selection={isSelect}
    onItemClick={onItemClick}
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
