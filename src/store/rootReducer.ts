import { combineReducers } from "redux";
import DeckReducer from "../features/DeckViewer/store/reducer";
const rootReducer = combineReducers({
  deckReducer: DeckReducer,
});

export default rootReducer;
