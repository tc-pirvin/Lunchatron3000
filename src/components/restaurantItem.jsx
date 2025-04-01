import { React, useState, useEffect } from 'react';

function RestaurantItem(props) {
  const isSelected = props.selectedItems.includes(props.restaurant);

  const itemStyle = {
    fontWeight: isSelected ? 'bold' : '',
    backgroundColor: isSelected ? '#ffcc5f' : '',
    color: '#24191f',
    height: 70,
    width: 120,
    padding: 12,
    border: '2px solid #ccc',
    borderColor: isSelected ? '#24191f' : '#ccc',
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
