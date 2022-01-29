import { Reducer } from "redux";

import { Actions, DeckActions } from "./actions";

export interface DeckState {
  loadingUpload: boolean;
  loadingDownload: boolean;
  currentDeck: any;
  error: string;
}

const initialState: DeckState = {
  loadingUpload: false,
  loadingDownload: false,
  currentDeck: {},
  error: "",
};
const DeckReducer: Reducer<DeckState, DeckActions> = (
  state = initialState,
  action: DeckActions
): DeckState => {
  switch (action.type) {
    case Actions.GET_DECK_START:
      return { ...state, loadingDownload: true };
    case Actions.GET_DECK_SUCCESS:
      return { ...state, loadingDownload: false, currentDeck: action.payload };
    case Actions.GET_DECK_FAILURE:
      return { ...state, loadingDownload: false };
    case Actions.UPLOAD_FILE_START:
      return { ...state, loadingUpload: true };
    case Actions.UPLOAD_FILE_SUCCESS:
      return { ...state, loadingUpload: false };
    case Actions.UPLOAD_FILE_FAILURE:
      return { ...state, loadingUpload: false };
    default:
      return state;
  }
};

export default DeckReducer;
