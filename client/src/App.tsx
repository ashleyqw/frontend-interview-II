/* eslint-disable */
import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Flashcard, FlashcardAndLocalState} from "./types";
import FlashcardWrapper from "./Flashcard";
import Autocomplete from "./Autocomplete";

type CardMap = {
  [id: string]: Flashcard
}

export const updateFlashcard = ({id, newTerm, newDefinition}: {id: string, newTerm: string, newDefinition: string}) => {
  return fetch('/api/flashcards/' + id, {method: 'PATCH', headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({term: newTerm, definition: newDefinition}),
  })
}

const useFlashcards = (): {
  flashcards: FlashcardAndLocalState[],
  updatedCards: CardMap,
  addToUpdateList: (id: string, newTerm: string, newDefinition: string) => void,
} => {
  const [flashcards, setFlashcards] = useState<(FlashcardAndLocalState)[]>([]);
  const updatedCards: CardMap = {}; 

  useEffect(() => {
    fetch('/api/flashcards')
      .then((response) => response.json())
      .then((flashcardApiResult: Flashcard[]) => {
        const flashcardsWithLocalState = flashcardApiResult.map((flashcard) => {
          return {...flashcard, isInEditMode: true}
        });
        setFlashcards(flashcardsWithLocalState);
      });
  }, []);

  const addToUpdateList = (id: string, newTerm: string, newDefinition: string): void => {
    updatedCards[id] = {id, term: newTerm, definition: newDefinition}
  }

  return {flashcards, updatedCards, addToUpdateList};
}

function App() {
  const { flashcards, updatedCards, addToUpdateList } = useFlashcards();

  const saveAll = useCallback(() => {
    Promise.all(Object.entries(updatedCards).map(
      async ([id, card]) => {
        await updateFlashcard({id, newTerm: card.term, newDefinition: card.definition})
      }))
    .then((res) => {
      alert("Saved all flashcards!");
    })
  }, [flashcards]);

  // Pretend save all works
  // Save all now works but not a perfect solution
  return (
    <div className="App">
      <header className="App-header">
        <h1>Get ideas for flashcards</h1>
        <Autocomplete/>
        <h1>Here are all the flashcards!</h1>
        <button onClick={saveAll}>Save all</button>
        {flashcards.map((flashcard) => (
          <FlashcardWrapper flashcard={flashcard} addToUpdateList={addToUpdateList} />
        ))}
      </header>
    </div>
  );
}

export default App;