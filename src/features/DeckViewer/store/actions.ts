export enum Actions {
  UPLOAD_FILE_START = "UPLOAD_FILE_START",
  UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS",
  UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE",

  GET_DECK_START = "GET_DECK_START",
  GET_DECK_SUCCESS = "GET_DECK_SUCCESS",
  GET_DECK_FAILURE = "GET_DECK_FAILURE",
}

export function uploadFileStart() {
  return {
    type: Actions.UPLOAD_FILE_START as Actions.UPLOAD_FILE_START,
  };
}

export function uploadFileSuccess() {
  return {
    type: Actions.UPLOAD_FILE_SUCCESS as Actions.UPLOAD_FILE_SUCCESS,
  };
}

export function uploadFileFailure() {
  return {
    type: Actions.UPLOAD_FILE_FAILURE as Actions.UPLOAD_FILE_FAILURE,
  };
}

export function getDeckStart() {
  return {
    type: Actions.GET_DECK_START as Actions.GET_DECK_START,
  };
}

export function getDeckSuccess(payload: any) {
  return {
    type: Actions.GET_DECK_SUCCESS as Actions.GET_DECK_SUCCESS,
    payload,
  };
}

export function getDeckFailure() {
  return {
    type: Actions.GET_DECK_FAILURE as Actions.GET_DECK_FAILURE,
  };
}

export type DeckActions =
  | ReturnType<typeof uploadFileStart>
  | ReturnType<typeof uploadFileSuccess>
  | ReturnType<typeof uploadFileFailure>
  | ReturnType<typeof getDeckStart>
  | ReturnType<typeof getDeckSuccess>
  | ReturnType<typeof getDeckFailure>;
