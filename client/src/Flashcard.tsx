import {FlashcardWithActionsAndLocalState} from "./types";


export type FlashcardIdMap = {
  [id: string]: FlashcardWithActionsAndLocalState,
}

type FlashcardWrapperProps = {
  id: string,
  flashcardsWithActions: FlashcardIdMap,
  saveAll: () => void,
}

const FlashcardWriteMode = (props: FlashcardWithActionsAndLocalState & {id: string}) => {
  // This mimics a long running process / this component being deeper nested
  Array(100000).fill(0)
  return (
    <div>
      <input value={props.term} onChange={(e) => props.setFlashcardTerm({id: props.id, newTerm: e.target.value})}/>
      <input value={props.definition} onChange={(e) => props.setFlashcardDefinition({id: props.id, newDefinition: e.target.value})}/>
      <div>
        <button onClick={() => props.toggleEditMode({id: props.id})}>Read</button>
        <button onClick={() => props.saveFlashcard({id: props.id})}>Save</button>
      </div>
    </div>
  )
}

const FlashcardReadMode = (props: FlashcardWithActionsAndLocalState & {id: string}) => {
  return (
    <div>
      <div>{props.term}</div>
      <div>{props.definition}</div>
      <button onClick={() => props.toggleEditMode({id: props.id})}>Edit</button>
    </div>
  )
}

const FlashcardWrapper = (props: FlashcardWrapperProps) => {
  const { id, flashcardsWithActions } = props;
  return (
    <div>
      <button onClick={props.saveAll}>Save all</button>
      {flashcardsWithActions[id].isInEditMode ?
        <FlashcardWriteMode {...flashcardsWithActions[id]} id={id} />
        :
        <FlashcardReadMode {...flashcardsWithActions[id]} id={id}/>
      }
    </div>
  )
}

export default FlashcardWrapper;
