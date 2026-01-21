import { useState, useEffect } from "react";

const Weather = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupération de la clé API (avec Vite)
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    // 2. useEffect pour l'appel API (Job 02 - Étape 5)
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${API_KEY}&units=metric&lang=fr`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Erreur réseau ou ville introuvable");
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    // 3. Affichage (Job 02 - Étape 6 & 7) [cite: 206]
    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!weatherData) return null;

    // URL de l'icône
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    return (
        <div>
            <h2>Météo à {weatherData.name}</h2>
            <img src={iconUrl} alt={weatherData.weather[0].description} />

            {/* Affichage des données demandées */}
            <p>Température : {Math.round(weatherData.main.temp)}°C</p>
            <p>Description : {weatherData.weather[0].description}</p>
            <p>Humidité : {weatherData.main.humidity}%</p>
            <p>Vent : {weatherData.wind.speed} m/s</p>
        </div>
    );
};

export default Weather;



