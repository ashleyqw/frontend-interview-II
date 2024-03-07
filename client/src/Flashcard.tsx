import {FlashcardAndLocalState} from "./types";
import React, { useState } from 'react';
import {updateFlashcard} from "./App";

type FlashcardWrapperProps = {
  flashcard: FlashcardAndLocalState,
  addToUpdateList: (id: string, term: string, definition: string) => void
}

const FlashcardWriteMode = ({flashcard, setInEditMode, addToUpdateList} : {flashcard: FlashcardAndLocalState, setInEditMode: (j: boolean) => void, addToUpdateList: (id: string, term: string, definition: string) => void}) => {
  const [term, setTerm] = useState(flashcard.term)
  const [definition, setDefinition] = useState(flashcard.definition)
  // This mimics a long running process / this component being deeper nested
  Array(100000).fill(0)
  return (
    <div>
      <input value={term} onChange={(e) => {
        setTerm(e.target.value);
        addToUpdateList(flashcard.id, e.target.value, definition);
      }}/>
      <input value={definition} onChange={(e) => {
          setDefinition(e.target.value);
          addToUpdateList(flashcard.id, term, e.target.value);
        }}/>
      <div>
        <button onClick={() => setInEditMode(false)}>Read</button>
        <button onClick={() => updateFlashcard({id: flashcard.id, newTerm: term, newDefinition: definition})}>Save</button>
      </div>
    </div>
  )
}

const FlashcardReadMode = ({flashcard, setInEditMode} : {flashcard: FlashcardAndLocalState, setInEditMode: (j: boolean) => void}) => {
  return (
    <div>
      <div>{flashcard.term}</div>
      <div>{flashcard.definition}</div>
      <button onClick={() => setInEditMode(true)}>Edit</button>
    </div>
  )
}

const FlashcardWrapper = (props: FlashcardWrapperProps) => {
  const { flashcard, addToUpdateList } = props;
  const [inEditMode, setInEditMode] = useState(true)
  return (
    <div>
      {inEditMode ?
        <FlashcardWriteMode flashcard={flashcard} setInEditMode={setInEditMode} addToUpdateList={addToUpdateList} />
        :
        <FlashcardReadMode flashcard={flashcard} setInEditMode={setInEditMode} />
      }
    </div>
  )
}

export default FlashcardWrapper;
