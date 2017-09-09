import React from 'react';

export default function List(props) {
  const items = props.items.map((value, index) =>
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
