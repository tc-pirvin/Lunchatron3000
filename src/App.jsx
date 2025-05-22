import logo from './logo.svg';
import './App.css';
import RestaurantItem from './components/restaurantItem';
import { useState, useEffect } from 'react';
import { jsx } from 'react/jsx-runtime';
import tacos from './assets/tacos.jpg';

function App() {
  let socket = new WebSocket('ws://10.16.118.201:3001/');

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showVotingTimer, setShowVotingTimer] = useState(false);

  const [timerLengthMinutes, setTimerLengthMinutes] = useState(60);

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
    height: 64,
    width: 200,
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

  const largeLabelStyle = { 
    fontWeight: 'bold', 
    fontSize: 24,
  }

  const inputStyle = { 
    display: 'flex',
    border: '1px solid #9d9d9d',
    padding: 12,
    borderRadius: 4,
    width: 40,
    textAlign: 'center',
    marginRight: 24,
    marginLeft: 24,
    fontSize: 16,
  }

  const handleTimerLengthChange = (event) => {
    console.log(event.target.value);
    setTimerLengthMinutes(event.target.value);
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
    socket.send(JSON.stringify(selectedRestaurants));
    // const response = await fetch("http://10.16.118.201:3001/api/submit", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(selectedRestaurants),
    // });    // fetch('http://10.16.118.201:3001/')
    //   .then((response) => response.json())
    //   .then(() => {
    //     console.log("messaged server ig");
    //   });
  }

  return (
    <div className="App">
      <section className="App-header">
        <div style={{ textAlign: 'left', width: '100%', padding: 12, background: `url(${tacos})` }}>
          <h1>
            Lunchatron 3000 <span style={{ fontSize: 16 }}>by: <a style={{ color: '#fff', textDecorationLine: 'none'}} href="twitch.tv/kattzz">Pierce</a></span>
          </h1>
        </div>
      </section>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <section>
          <div style={adminSectionStyle}>
            <label for='timerLength' style={largeLabelStyle}>Timer Length (mins):</label>
            <input id='timerLength' onChange={handleTimerLengthChange} style={inputStyle} placeholder='Length' value={timerLengthMinutes}/>
            <button onClick={handleSubmitClick} style={startTimerButtonStyle}>
              Start
            </button>
          </div>
        </section>
        <section>
          <div style={choicesSectionStyle}>
            <div style={headerstyle}>
              <span style={largeLabelStyle}>Options <span style={{ fontWeight: 'normal', fontSize: 16 }}>(pick 3)</span></span>
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
            <span style={largeLabelStyle}>Voting is LIVE</span>
          }
        </section>
      </div>
    </div>
  );
}

export default App;
