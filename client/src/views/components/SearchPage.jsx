import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    try {
      // Check if the query matches 'psychologist' or 'psychologists'
      if (
        query.toLowerCase().includes("psychologist") ||
        query.toLowerCase().includes("psychologists")
      ) {
        // Navigate to the 'psy' page
        navigate("/psychologists");
      } else {
        // Otherwise, perform the regular search
        const response = await axios.get(`/search?query=${query}`);
        setResults(response.data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleResultClick = (result) => {
    // Navigate to the detailed page for the selected result
    navigate(`/details/${result.id}`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {results.map((result) => (
          <li key={result.id} onClick={() => handleResultClick(result)}>
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
