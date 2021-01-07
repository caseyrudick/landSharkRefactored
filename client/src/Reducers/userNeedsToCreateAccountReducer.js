import { SIGN_UP_REQUESTED,
  SIGN_UP_RECEIVED,
  SIGN_UP_FAILED
} from "../ActionCreators/types"


const INITIAL_STATE = {
  response: false,
  status: ""
}


export default (state = INITIAL_STATE, {type, payload}) => {
  
  switch (type) {
    case SIGN_UP_REQUESTED:
      return {...state, status: "waiting"}
    case SIGN_UP_RECEIVED:
      return {...state, response: payload, status: "received"}
    case SIGN_UP_FAILED:
      return {...state, response: payload, status: "failed"}
    default:
      return state
  }
}
