import { React, useState, useEffect } from 'react';

function RestaurantItem(props) {
  const itemStyle = {
    fontWeight: props.selectedItems.includes(props.restaurant) ? 'bold' : '',
    height: 70,
    width: 120,
    padding: 12,
    border: '1px solid #ccc',
    borderRadius: 4,
    margin: 12,
    display: 'inline-block',
    opacity: props.disableItem ? 0.4 : 1.0
  }

  return (
    <div style={itemStyle} onClick={props.onClick}>
      <p>{props.restaurant.name}</p>
    </div>
  );
}

export default RestaurantItem;
