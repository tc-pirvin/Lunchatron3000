import logo from './logo.svg';
import './App.css';
import RestaurantItem from './components/restaurantItem';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [availableRestaurants, setAvailableRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  useEffect(() => {
    async function fetchAvailableRestaurants() {
      fetch('http://10.16.118.201:3001/')
        .then((response) => response.json())
        .then((restaurants) => {
          setAvailableRestaurants(restaurants);
        });
    }

    fetchAvailableRestaurants();
  }, []);

  const columnSectionStyle = {
    width: '40vw',
    height: '100vh',
    display: 'inline-block',
  }

  const handleClick = (rest) => {
    if (selectedRestaurants.length === 3 && !selectedRestaurants.includes(rest)) {
      alert("Hey stop. 3 votes max >:(");
      return;
    }

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
        <div style={{ textAlign: 'left', width: '100%', padding: 12 }}>
          <h1>
            Lunchatron 3000 <span style={{ fontSize: 16 }}>by: <a style={{ color: '#fff', textDecorationLine: 'none'}} href="twitch.tv/kattzz">kattzz</a></span>
          </h1>
        </div>
      </section>
      <section>
        <div style={columnSectionStyle}>
          <h2>Restaurants</h2>
          { availableRestaurants.map((rest, index) => {
            return(
              <RestaurantItem
                key={index}
                onClick={() => handleClick(rest)}
                restaurant={rest}
                selectedItems={selectedRestaurants}
                disableItem={selectedRestaurants.length === 3 && !selectedRestaurants.includes(rest)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
