import React from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex items-center w-full max-w-md mx-auto bg-white rounded-full shadow-md overflow-hidden border border-gray-200 transition-shadow duration-300 hover:shadow-lg">
      <input
        type="text"
        placeholder="Ara..."
        className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-l-full"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-full transition-all duration-200">
        <SearchIcon size={20} />
      </button>
    </div>
  );
};

export default Search;