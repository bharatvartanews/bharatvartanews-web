"use client";

import { useSearch } from "../context/SearchContext";

export default function HeaderSearch() {
  const { query, setQuery } = useSearch();

  return (
    <div className="search-box">
      <input
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
