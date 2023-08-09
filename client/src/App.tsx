/* eslint-disable */
import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {API_PREFIX} from "./constants";
import {Flashcard, FlashcardAndLocalState, FlashcardWithActionsAndLocalState} from "./types";
import FlashcardWrapper from "./Flashcard";
import Autocomplete from "./Autocomplete";

const updateFlashcard = ({id, newTerm, newDefinition}: {id: string, newTerm: string, newDefinition: string}) => {
  return fetch('/api/flashcards/' + id, {method: 'PATCH', headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({term: newTerm, definition: newDefinition}),
  })
}


const updateManyFlashcards = (flashcards: Flashcard[]) => {
  return fetch('/api/flashcards', {method: 'PATCH', headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({flashcards: flashcards}),
  })
}


const useFlashcards = (): [(FlashcardAndLocalState)[], React.Dispatch<React.SetStateAction<(FlashcardAndLocalState)[]>>] => {
  const [flashcards, setFlashcards] = useState<(FlashcardAndLocalState)[]>([]);
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
  return [flashcards, setFlashcards];
}

const useFlashcardIdeas = (): (string)[] => {
  const [definitionIdeas, setDefinitionIdeas] = useState<(string)[]>([]);
  useEffect(() => {
    fetch('/api/flashcard-ideas' )
      .then((response) => response.json())
      .then((flashcardApiResult) => {
        console.log(`flashcardApiResult: `, flashcardApiResult)
        setDefinitionIdeas(flashcardApiResult.definitions);
      });
  }, []);
  return definitionIdeas;
}

function App() {
  const [ flashcards, setFlashcards ] = useFlashcards();
  const definitionIdeas = useFlashcardIdeas();

  const updateFlashcardTerm = async ({id, newTerm}: {id: string, newTerm: string}) => {
    const existingFlashcard = flashcards.find((flashcard) => flashcard.id === id);
    if (existingFlashcard === undefined) {
      throw new Error("Flashcard not found")
    }
    const newFlashcard = { ...existingFlashcard, term: newTerm };
    const newFlashcards = flashcards.map((flashcard) => {
      if (flashcard.id === id) {
        return newFlashcard;
      }
      return flashcard;
    });
    setFlashcards(newFlashcards);
  }

  const updateFlashcardDefinition = async ({id, newDefinition}: {id: string, newDefinition: string}) => {
  const existingFlashcard = flashcards.find((flashcard) => flashcard.id === id);
    if (existingFlashcard === undefined) {
      throw new Error("Flashcard not found")
    }
    const newFlashcard = { ...existingFlashcard, definition: newDefinition };
    const newFlashcards = flashcards.map((flashcard) => {
      if (flashcard.id === id) {
        return newFlashcard;
      }
      return flashcard;
    });
    setFlashcards(newFlashcards);
  }

  const toggleEditMode = async ({ id }: { id: string }) => {
    const existingFlashcard = flashcards.find((flashcard) => flashcard.id === id);
    if (existingFlashcard === undefined) {
      throw new Error("Flashcard not found")
    }
    const newFlashcard = { ...existingFlashcard, isInEditMode: !existingFlashcard.isInEditMode };
    const newFlashcards = flashcards.map((flashcard) => {
      if (flashcard.id === id) {
        return newFlashcard;
      }
      return flashcard;
    });
    setFlashcards(newFlashcards);
  }

  const saveFlashcard = async ({ id }: { id: string }) => {
    const existingFlashcard = flashcards.find((flashcard) => flashcard.id === id);
    if (existingFlashcard === undefined) {
      throw new Error("Flashcard not found")
    }
    await updateFlashcard({id, newTerm: existingFlashcard.term, newDefinition: existingFlashcard.definition});
  }

  const flashcardsWithActionsList = flashcards.map((flashcard) => {
    return {
      ...flashcard,
      setFlashcardTerm: updateFlashcardTerm,
      setFlashcardDefinition: updateFlashcardDefinition,
      toggleEditMode,
      saveFlashcard,
    }
  });

  const flashcardsIdMap = flashcardsWithActionsList.reduce((acc, flashcard) => {
    acc[flashcard.id] = flashcard;
    return acc;
  }, {} as { [id: string]: FlashcardWithActionsAndLocalState });

  const saveAll = useCallback(() => {
    updateManyFlashcards(flashcards).then((res) => {
      alert("Saved all flashcards!");
    })
  }, []);

  // Pretend save all works
  return (
    <div className="App">
      <header className="App-header">
        <h1>Get ideas for flashcards</h1>
        <Autocomplete suggestions={definitionIdeas} />
        <h1>Here are all the flashcards!</h1>
        {flashcards.map((flashcard) => (
          <FlashcardWrapper id={flashcard.id} flashcardsWithActions={flashcardsIdMap} saveAll={saveAll} />
        ))}
      </header>
    </div>
  );
}

export default App;