import {
  GET_WELLS_FROM_DYNAMO_REQUESTED,
  GET_WELLS_FROM_DYNAMO_RECEIVED,
  GET_WELLS_FROM_DYNAMO_FAILED
} from "../ActionCreators/types"


const INITIAL_STATE = {
  response: {},
  status: ""
}

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GET_WELLS_FROM_DYNAMO_REQUESTED:
      return {...state, status: "waiting"}
    case GET_WELLS_FROM_DYNAMO_RECEIVED:
      return {...state, response: payload, status: "received"}    
    case GET_WELLS_FROM_DYNAMO_FAILED:
      return {...state, response: payload, status: "failed"}
    default:
      return state
  }
}