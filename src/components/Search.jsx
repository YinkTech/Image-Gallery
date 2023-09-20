import React from 'react'

const Search = () => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      <input
      type="text"
      placeholder="Search by tag..."
      onChange={handleSearch}
    />
    </div>
  )
}

export default Search