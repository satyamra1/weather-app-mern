import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 2) return;
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          headers: {
            "X-RapidAPI-Key": "your_rapidapi_key",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
          params: { namePrefix: input, limit: 5 },
        }
      );
      setSuggestions(response.data.data.map(city => city.name));
    };
    fetchSuggestions();
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        list="suggestions"
      />
      <datalist id="suggestions">
        {suggestions.map((city, index) => (
          <option key={index} value={city} />
        ))}
      </datalist>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;