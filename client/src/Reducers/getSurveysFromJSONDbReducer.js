import { 
  GET_SURVEYS_FROM_JSONDB_REQUESTED,
  GET_SURVEYS_FROM_JSONDB_RECEIVED,
  GET_SURVEYS_FROM_JSONDB_FAILED,
} from "../ActionCreators/types"

const INITIAL_STATE = {
  response: {},
  state: ""
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_SURVEYS_FROM_JSONDB_REQUESTED:
      return {...state, status: "waiting"}
    case GET_SURVEYS_FROM_JSONDB_RECEIVED:
      return {...state, response: payload, status: "received"}
    case GET_SURVEYS_FROM_JSONDB_FAILED:
      return {...state, response: payload, status: "failed"}
    default:
      return state
  }
}