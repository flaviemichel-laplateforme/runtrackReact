import { useState } from "react";
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue.trim() !== '') {
            onSearch(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Entrez la ville"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Rechercher</button>
        </form>
    );
};

export default SearchBar;