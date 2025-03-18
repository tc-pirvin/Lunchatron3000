import { React, useState, useEffect } from 'react';

function RestaurantItem(props) {
  // console.log(props.restaurant.name);
  return (
    <div onClick={props.onClick}>
      <p>{props.restaurant.name}</p>
    </div>
  );
}

export default RestaurantItem;
