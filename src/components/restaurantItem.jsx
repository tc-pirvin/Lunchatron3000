import { React, useState, useEffect } from 'react';

function RestaurantItem(props) {
  useEffect(() => {
    console.log("BRUH");
  }, [props.selectedItems]);

  const itemStyle = {
    fontWeight: props.selectedItems.includes(props.restaurant) ? 'bold' : '',
    height: 70,
    width: 120,
    padding: 12,
    border: '1px solid #ccc',
    borderRadius: 4,
    margin: 12,
    display: 'inline-block'
  }

  return (
    <div style={itemStyle} onClick={props.onClick}>
      <p style={{}}>{props.restaurant.name}</p>
    </div>
  );
}

export default RestaurantItem;
