import { useEffect, useState } from 'react';
import './App.css';

import Weather from './components/Weather/Weather';
import SearchBar from './components/SearchBar/SearchBar';
import Favorites from './components/Favorites/Favorites';

function App() {
  // CORRECTION 1 : "favorites" en minuscule pour ne pas confondre avec le composant "Favorites"
  const [city, setCity] = useState('Paris');
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
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
  };

  return (
    <div className='App'>
      <h1>Météo App</h1>

      <SearchBar onSearch={handleSearch} />


      <Weather
        city={city}
        onAddFavorite={addFavorites}
      />


      <Favorites
        favorites={favorites}
        onSelectCity={handleSearch}
        onRemoveFavorite={removeFavorites}
      />

    </div>
  )
}

export default App;