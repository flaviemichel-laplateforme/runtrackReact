import { useState, useEffect } from "react";
import './Weather.css';

const Weather = ({ city, onAddFavorite, onWeatherChange }) => {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. useEffect pour l'appel API (Job 02 - Étape 5)
    useEffect(() => {
        if (!city) return;
        const fetchWeather = async () => {

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Erreur réseau ou ville introuvable");
                }

                setWeatherData(data);

                if (data.weather && data.weather.length > 0) {
                    onWeatherChange(data.weather[0].main);
                }

            } catch (err) {
                console.error(err);
                setError(err.message);
                setWeatherData(null);

            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city, onWeatherChange]);

    // 3. Affichage (Job 02 - Étape 6 & 7) [cite: 206]
    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!weatherData) return null;

    // URL de l'icône
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    return (
        <div className="weather-container">
            <h2>Météo à {weatherData.name}</h2>
            <img src={iconUrl} alt={weatherData.weather[0].description} />

            {/* Affichage des données demandées */}
            <div className="weather-info">
                <p>🌡️ Température : {Math.round(weatherData.main.temp)}°C</p>
                <p>💧 Humidité : {weatherData.main.humidity}%</p>
                <p>☁️ {weatherData.weather[0].description}</p>
                <p>💨 Vent : {weatherData.wind.speed} m/s</p>
            </div>

            <button
                onClick={() => onAddFavorite(weatherData.name)}
                className="add-favorite-btn"
            >
                ⭐ Ajouter aux favoris
            </button>
        </div >
    );
};

export default Weather;



