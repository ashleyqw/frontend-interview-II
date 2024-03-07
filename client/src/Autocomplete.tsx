import React, { useState } from 'react';

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [definitionIdeas, setDefinitionIdeas] = useState<(string)[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setShowSuggestions(true);
    if (value) {
      fetch('/api/flashcard-ideas/' + value)
        .then((response) => response.json())
        .then((flashcardApiResult) => {
          setDefinitionIdeas(flashcardApiResult.definitions);
        });
    } else {
      setDefinitionIdeas([]);
    }
  };

  const handleSelection = (value: string) => {
    setInputValue(value);
    setShowSuggestions(false);
    setDefinitionIdeas([]);
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
          {definitionIdeas.map((idea, index) => (
            <li key={index} onClick={() => handleSelection(idea)}>
              {idea}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
