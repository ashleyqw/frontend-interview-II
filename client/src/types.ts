export type Flashcard = {
  term: string,
  definition: string,
  id: string,
};

type FlashcardLocalState = {
  isInEditMode: boolean,
}

export type FlashcardActions = {
  setFlashcardTerm: ({id, newTerm}: {id: string, newTerm: string}) => void,
  setFlashcardDefinition: ({id, newDefinition}: {id: string, newDefinition: string}) => void,
  saveFlashcard: ({id}: {id: string}) => Promise<void>,
  toggleEditMode: ({id}: {id: string}) => void,
};

export type FlashcardWithActionsAndLocalState = Omit<Flashcard & FlashcardActions & FlashcardLocalState, 'id'>;

export type FlashcardAndLocalState = Flashcard & FlashcardLocalState;
