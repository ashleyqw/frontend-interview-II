export type Flashcard = {
  term: string,
  definition: string,
  id: string,
};

type FlashcardLocalState = {
  isInEditMode: boolean,
}

export type FlashcardAndLocalState = Flashcard & FlashcardLocalState;
