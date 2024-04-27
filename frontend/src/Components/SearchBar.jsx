import React, { useState } from 'react';
import './Styles/SearchBar.css'

const SearchBar = ({ onSearch, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchQuery(inputValue);
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            onSearch(searchQuery);
        } else{
            onSearch('$');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={{ paddingBottom: "3%", justifyContent: "center", alignItems: "center", display: 'flex' }}>
            {/*Aquí cambiamos el tamaño del buscador */}
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={onClose} className='buttonClose'>
                        <i className='bx bx-x' style={{ fontSize: "2rem" }}></i>
                    </button>
                </div>
                <div className="search-bar-container">
                    <button onClick={handleSearch}>
                        <i className='bx bx-search-alt-2' style={{ fontSize: "1.5rem" }}></i>
                    </button>
                    <input
                        type="text"
                        placeholder="What would you like to listen to?"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
