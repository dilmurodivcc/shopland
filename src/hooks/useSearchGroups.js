import { useState } from "react";
import API from "../API";

export const useSearchGroups = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const searchGroups = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.get(`/groups/search?q=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching groups:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchGroups,
    isLoading,
    searchResults,
  };
};

