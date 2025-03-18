import logo from './logo.svg';
import './App.css';
import list from './database/restaurants.json';
import RestaurantItem from './components/restaurantItem';

function App() {
  const handleClick = (rest) => {
    alert(rest.name);
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
      <section>
        <h2>Restaurants:</h2>
        { list.restaurants.map((rest) => {
          return(
            <RestaurantItem
              onClick={() => handleClick(rest)}
              restaurant={rest}
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;
