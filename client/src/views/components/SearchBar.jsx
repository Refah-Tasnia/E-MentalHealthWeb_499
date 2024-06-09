import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setError("Please enter a search query.");
    } else {
      setError("");
      if (
        query.toLowerCase().includes("psychologist") ||
        query.toLowerCase().includes("psychologists") ||
        query.toLowerCase().includes("doctors") ||
        query.toLowerCase().includes("doctor")
      ) {
        navigate("/psychologists");
      } else if (
        query.toLowerCase().includes("chatbot") ||
        query.toLowerCase().includes("chat")
      ) {
        navigate("/chat");
      } else if (
        query.toLowerCase().includes("video") ||
        query.toLowerCase().includes("video call") ||
        query.toLowerCase().includes("video calling") ||
        query.toLowerCase().includes("video conference") ||
        query.toLowerCase().includes("emotion") ||
        query.toLowerCase().includes("call")
      ) {
        navigate("/VideoHome");
      } else {
        performSearch(query);
      }
    }
  };

  const performSearch = async (query) => {
    try {
      // Perform the search logic here (e.g., fetch data from an API)
      // Replace the following lines with your actual search logic
      const response = await fetch(`/search?query=${query}`);
      const data = await response.json();
      // setResults(data); // You may want to use this if you want to display search results
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex relative">
      <div className="w-full h-[45px] sm:w-full rounded-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full h-full rounded-md text-black font-medium px-2"
        />
      </div>
      <div className="absolute right-2 text-white font-medium bg-[#0D1130] hover:bg-[#FF7E00] rounded-md py-1 px-2 mt-[7px]">
        <button
          type="submit"
          className="hover:bg-[#FF7E00] hover:text-black border-none"
        >
          Submit
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {/* 
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul> 
      */}
    </form>
  );
};

export default SearchBar;
