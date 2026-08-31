export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'Le paramètre "city" est requis.' });
  }

  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data.message || 'Ville introuvable.' });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ message: 'Erreur lors de la récupération des données météo.' });
  }
}
