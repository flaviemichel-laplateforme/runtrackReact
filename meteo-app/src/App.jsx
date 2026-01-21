import React from 'react';
import './App.css';

import Weather from './components/Weather/Weather'

function App() {
  console.log("Ma clé API :", import.meta.env.VITE_WEATHER_API_KEY)
  return (
    <div className='App'>
      <h1>Météo App</h1>
    </div>
  )

}

export default App;
