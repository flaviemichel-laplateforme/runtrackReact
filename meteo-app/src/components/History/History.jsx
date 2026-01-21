import React from 'react';
import './History.css'; // IMPORTANT : On importe le fichier CSS ici

const History = ({ history, onSelectCity }) => {
    // Si l'historique est vide, on n'affiche rien
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="history-container">
            <small className="history-label">
                Dernières recherches :
            </small>

            <div className="history-list">
                {history.map((city, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectCity(city)}
                        className="history-btn"
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default History;