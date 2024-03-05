import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../styles/Header.css';

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    axios.get(`http://localhost:3000/search?query=${searchValue}`)
      .then(response => {
        navigate('/search-results', { state: { searchResults: response.data } });
      })
      .catch(error => {
        console.error('Error searching:', error);
      });
  };

  return (
    <div>
      <div className='Heading'>
        <p> JobBoardLogo</p>
        <h2> Welcome to the Opportunities Job Dashboard</h2>
        <p> We will do something Here </p>
      </div>
      <div className="Header">
        <input
          type="text"
          className="SearchInput"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <button
          className="SearchButton"
          onClick={handleSearchButtonClick}
        >
          Search
        </button>
      </div>
      <div className='filter'>
        <select className="FilterSelect">
          <option value="">Filter 1</option>
          <option value="">Filter 2</option>
          <option value="">Filter 3</option>
        </select>
        <button className="SignupButton">Signup</button>
        <button className="SigninButton">Signin</button>
      </div>
    </div>
  );
}

export default Header;
