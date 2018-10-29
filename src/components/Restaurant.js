
import React, { Component } from 'react';

function Restaurant(props) {

  return (
    <tr>
      <td>{props.restaurant.name}</td> 
      <td>{props.restaurant.cuisine}</td> 
      <td><button onClick={() => props.onRemove()}>delete</button></td>
    </tr>
    
  );
}

export default Restaurant;