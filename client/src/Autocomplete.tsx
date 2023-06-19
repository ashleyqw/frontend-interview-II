// Autocomplete.tsx

import React, { useState } from 'react';

interface AutocompleteProps {
  suggestions: string[];
}

const Autocomplete = ({ suggestions }: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter the suggestions based on the input value
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    setShowSuggestions(true);
  };

  const handleSelection = (value: string) => {
    setInputValue(value);
    setShowSuggestions(false);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />

      {showSuggestions && (
        <ul>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelection(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
