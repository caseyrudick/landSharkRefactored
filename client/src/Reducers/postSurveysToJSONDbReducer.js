import { POST_SURVEYS_TO_JSONDB_REQUESTED, 
  POST_SURVEYS_TO_JSONDB_RECEIVED, 
  POST_SURVEYS_TO_JSONDB_FAILED } from "../ActionCreators/types"

const INITIAL_STATE = {
  reponse: {},
  status: ""
}

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case POST_SURVEYS_TO_JSONDB_REQUESTED:
      return {...state, status: "waiting"}
    case POST_SURVEYS_TO_JSONDB_RECEIVED:
      return {...state, response: payload, status: "received"}
    case POST_SURVEYS_TO_JSONDB_FAILED: 
      return {...state, response: payload, status: "failed"}
    default:
      return state
  }
} 