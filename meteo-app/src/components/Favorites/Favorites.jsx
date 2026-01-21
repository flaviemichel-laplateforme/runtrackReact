import React from "react";

const Favorites = ({ favorites, onSelectCity, onRemoveFavorite }) => {

    if (favorites.length === 0) {
        return <div style={{ marginTop: '20px' }}>Aucun favori pour l'instant.</div>;
    }

    return (
        <div className="favorites-container" style={{ marginTop: '20px' }}>
            <h3>Mes Favoris</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {favorites.map((favCity) => (
                    <li key={favCity} style={{ margin: '10px 0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {/* Au clic sur le nom, on change la ville principale */}
                        <span
                            onClick={() => onSelectCity(favCity)}
                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {favCity}
                        </span>

                        {/* Bouton de suppression */}
                        <button
                            onClick={() => onRemoveFavorite(favCity)}
                            style={{ background: 'red', color: 'white', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;