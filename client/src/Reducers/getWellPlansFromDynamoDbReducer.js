import {
  GET_WELL_PLANS_FROM_DYNAMODB_REQUESTED,
  GET_WELL_PLANS_FROM_DYNAMODB_RECEIVED,
  GET_WELL_PLANS_FROM_DYNAMODB_FAILED
} from "../ActionCreators/types"

const INITIAL_STATE = {
  response: {},
  status: ""
}

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GET_WELL_PLANS_FROM_DYNAMODB_REQUESTED:
      return {...state, status: "waiting"}
    case GET_WELL_PLANS_FROM_DYNAMODB_RECEIVED:
      return {...state, response: payload, status: "received"}
    case GET_WELL_PLANS_FROM_DYNAMODB_FAILED:
      return {...state, response: payload, status: "failed"}
    default:
      return state
  }
}