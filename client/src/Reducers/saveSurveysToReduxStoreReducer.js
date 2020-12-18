import { SAVE_SURVEYS_TO_REDUX_STORE_REQUESTED, 
  SAVE_SURVEYS_TO_REDUX_STORE_RECEIVED,
  SAVE_SURVEYS_TO_REDUX_STORE_FAILED } from "../ActionCreators/types"

const INITIAL_STATE = {
  response: {},
  status: ""
}

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_SURVEYS_TO_REDUX_STORE_REQUESTED:
      return {...state, status: "waiting"}
    case SAVE_SURVEYS_TO_REDUX_STORE_RECEIVED:
      return {...state, response: payload, status: "received"}
    case SAVE_SURVEYS_TO_REDUX_STORE_FAILED:
      return {...state, response: payload, status: "waiting"}
    default:
      return state
  }
}