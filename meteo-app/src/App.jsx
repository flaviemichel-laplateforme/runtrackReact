import { useEffect, useState } from 'react';
import './App.css';

import Weather from './components/Weather/Weather';
import SearchBar from './components/SearchBar/SearchBar';
import Favorites from './components/Favorites/Favorites';
import History from './components/History/History';

function App() {
  // CORRECTION 1 : "favorites" en minuscule pour ne pas confondre avec le composant "Favorites"
  const [city, setCity] = useState('Paris');
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  // / 1. Nouvel état pour stocker la condition météo (ex: 'Clear', 'Rain')
  const [weatherCondition, setWeatherCondition] = useState('default');

  // Charger les favoris au démarrage et //Charger l'historique au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedHistory = localStorage.getItem('history');
    if (savedFavorites)
      setFavorites(JSON.parse(savedFavorites));
    if (savedHistory)
      setHistory(JSON.parse(savedHistory));

  }, []);

  // Fonction pour ajouter un favori
  const addFavorites = (cityName) => {
    // CORRECTION : Utilisation de "favorites" (minuscule)
    if (!favorites.includes(cityName)) {
      const newFavorites = [...favorites, cityName];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorites = (cityToRemove) => {
    const newFavorites = favorites.filter(c => c !== cityToRemove);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
    addHistory(newCity);
  };

  const addHistory = (newCity) => {
    let newHistory = [newCity, ...history.filter(c => c !== newCity)];
    if (newHistory.length > 5) {
      newHistory = newHistory.slice(0, 5);
    }
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  return (
    <div className={`App ${weatherCondition}`}>
      <div className='content-wrapper'>
        <h1>Météo App</h1>

        <SearchBar onSearch={handleSearch} />

        <History history={history} onSelectCity={handleSearch} />

        <Weather
          city={city}
          onAddFavorite={addFavorites}
          onWeatherChange={setWeatherCondition}
        />


        <Favorites
          favorites={favorites}
          onSelectCity={handleSearch}
          onRemoveFavorite={removeFavorites}
        />

      </div>
    </div>
  )
}

export default App;