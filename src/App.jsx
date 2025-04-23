import logo from './logo.svg';
import './App.css';
import RestaurantItem from './components/restaurantItem';
import { useState, useEffect } from 'react';
import { jsx } from 'react/jsx-runtime';

function App() {
  let socket = new WebSocket('ws://10.16.118.201:3001/');

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showVotingTimer, setShowVotingTimer] = useState(false);

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

  useEffect(() => {
    socket.onopen = () => {
      // setShowVotingTimer(true);
    };

    // socket.onmessage = (event) => {
    //   console.log(event.data);
    // };
  }, []);

  const adminSectionStyle = {
    display: 'flex',
    width: '40vw',
    height: '70vh',
    // display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const choicesSectionStyle = {
    width: '40vw',
    height: '100vh',
    display: 'inline-block',
  }

  const headerstyle = {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 24,
    paddingBottom: 8,
  }

  const startTimerButtonStyle = {
    height: 72,
    width: 240,
    backgroundColor: '#ff6060',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 4,
    borderWidth: 0.5,
    fontSize: 32,
  }

  const submitButtonStyle = {
    height: 48,
    width: 140,
    backgroundColor: '#ff6060',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 24,
    borderWidth: 0.5,
    fontSize: 20,
  }

  const timerLabelStyle = { 
    fontWeight: 'bold', 
    fontSize: 32, 
    color: 'green',
  }

  const handleRestaurantClick = (rest) => {
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

  const handleSubmitClick = async () => {
    alert("Submit: " + selectedRestaurants + '?');
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <section>
          <div style={adminSectionStyle}>
            <button onClick={handleSubmitClick} style={startTimerButtonStyle}>
              Start Timer
            </button>
          </div>
        </section>
        <section>
          <div style={choicesSectionStyle}>
            <div style={headerstyle}>
              <span style={{ fontWeight: 'bold', fontSize: 32 }}>Restaurants</span>
              <button onClick={handleSubmitClick} style={submitButtonStyle}>
                Submit
              </button>
            </div>
            { availableRestaurants.map((rest, index) => {
              return(
                <RestaurantItem
                  key={index}
                  onClick={() => handleRestaurantClick(rest)}
                  restaurant={rest}
                  selectedItems={selectedRestaurants}
                  disableItem={selectedRestaurants.length === 3 && !selectedRestaurants.includes(rest)}
                />
              );
            })}
          </div>
          { showVotingTimer &&
            <span style={timerLabelStyle}>Voting is LIVE</span>
          }
        </section>
      </div>
    </div>
  );
}

export default App;
