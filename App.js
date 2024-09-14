
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to store countries data and user input
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [input, setInput] = useState('');

  // Fetch the data on component mount
  useEffect(() => {
    axios
      .get('https://dpaste.com/79QXDY8TD.json') // API call
      .then((response) => {
        setCountries(response.data); // Store the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Error handling
      });
  }, []);

  // Filter function to filter countries based on user input
  const handleInputChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setInput(userInput);

    // Filter countries based on input (name or capital)
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(userInput) ||
      country.capital.toLowerCase().includes(userInput)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <h1>Country Search</h1>
      {/* Input field for search */}
      <input
        type="text"
        placeholder="Search by country name or capital"
        value={input}
        onChange={handleInputChange} // Handle real-time input change
      />

      {/* Render filtered countries */}
      {filteredCountries.length > 0 ? (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name}>
              {country.name} - {country.capital}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default App;
