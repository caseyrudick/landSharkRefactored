import { GET_WELL_PLANS_FROM_JSONDB_REQUESTED, 
  GET_WELL_PLANS_FROM_JSONDB_RECEIVED,
  GET_WELL_PLANS_FROM_JSONDB_FAILED} from "../ActionCreators/types"


const INITIAL_STATE = {
  response: {},
  status: ""
}

export default (state = INITIAL_STATE, {type, payload}) => {
  
  switch (type) {
    case GET_WELL_PLANS_FROM_JSONDB_REQUESTED:
      console.log("hello")
      return {...state, status: "waiting"}
    case GET_WELL_PLANS_FROM_JSONDB_RECEIVED:
      console.log(payload)
      return {...state, response: payload, status: "received"}
    case GET_WELL_PLANS_FROM_JSONDB_FAILED:
      return {...state, response: payload, status: "failed"}
    default:
      return state
  }
}
