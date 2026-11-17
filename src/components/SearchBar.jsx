import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search by IP, URL, or error...',
  onClear,
  className = '',
  style = {}
}) => {
  return (
    <div className={`search-bar-wrap ${className}`} style={style}>
      <Search size={16} className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => {
            if (onClear) onClear();
            else onChange('');
          }}
          title="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
