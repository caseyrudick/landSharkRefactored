import { GET_LEASE_LINES_FROM_JSONDB_REQUESTED,
  GET_LEASE_LINES_FROM_JSONDB_RECEIVED,
  GET_LEASE_LINES_FROM_JSONDB_FAILED } from "../ActionCreators/types"

const INITIAL_STATE = {
  response: {},
  status: ""
}

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GET_LEASE_LINES_FROM_JSONDB_REQUESTED:
      return {...state, status: "waiting"}
    case GET_LEASE_LINES_FROM_JSONDB_RECEIVED:
      return {...state, response: payload, status: "received"}
    case GET_LEASE_LINES_FROM_JSONDB_FAILED:
      return {...state, response: payload, status: "failed"}
    default:
      return state
  }
}