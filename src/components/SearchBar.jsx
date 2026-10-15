function SearchBar({ searchTerm, setSearchTerm }) { return ( <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /> ); }

export default SearchBar;
