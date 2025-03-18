import logo from './logo.svg';
import './App.css';
import list from './database/restaurants.json';
import RestaurantItem from './components/restaurantItem';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  const handleClick = (rest) => {
    setSelectedRestaurants((prevSelectedRestaurants) => {
      let selectedRestaurantsCopy;
  
      if (prevSelectedRestaurants.includes(rest)) {
        selectedRestaurantsCopy = prevSelectedRestaurants.filter((r) => r !== rest);
      } else {
        selectedRestaurantsCopy = [...prevSelectedRestaurants, rest];
      }
  
      return selectedRestaurantsCopy;
    });
  }

  return (
    <div className="App">
      <section className="App-header">
        <div style={{ textAlign: 'left', width: '100%', padding: 12, alignSelf: 'center' }}>
          <h1>
            Lunchatron 3000 <span style={{ fontSize: 16 }}>by: <a style={{ color: '#fff', textDecorationLine: 'none'}} href="twitch.tv/kattzz">kattzz</a></span>
          </h1>
        </div>
      </section>
      <section style={{ justifyItems: 'center' }}>
        <div>
          <h2>Restaurants:</h2>
          { list.restaurants.map((rest, index) => {
            return(
              <RestaurantItem
                key={index}
                onClick={() => handleClick(rest)}
                restaurant={rest}
                selectedItems={selectedRestaurants}
              />
            );
          })}
        </div>
        <div>
          <h2>Your picks:</h2>
          { selectedRestaurants.map((rest, index) => {
            return(
              <p style={{ fontWeight: 'bold', }}>{ rest.name }</p>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
