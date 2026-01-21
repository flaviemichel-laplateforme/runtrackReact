import { useState } from 'react';
import './App.css';

import Weather from './components/Weather/Weather';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  console.log("Ma clé API :", import.meta.env.VITE_WEATHER_API_KEY)
  const [city, setCity] = useState('Paris');

  const handleSearch = (newCity) => {
    setCity(newCity);
  };


  return (
    <div className='App'>

      <h1>Météo App</h1>

      <SearchBar onSearch={handleSearch} />

      <Weather city={city} />

    </div>
  )

}

export default App;
