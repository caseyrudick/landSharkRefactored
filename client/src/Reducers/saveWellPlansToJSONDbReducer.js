import { SAVE_WELL_PLANS_TO_JSON_REQUESTED,
  SAVE_WELL_PLANS_TO_JSON_RECEIVED,
  SAVE_WELL_PLANS_TO_JSON_FAILED } from "..ActionCreators/types"

const INITIAL_STATE = {
  response: {},
  status: ""
}
export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_WELL_PLANS_TO_JSON_REQUESTED:
      return {...state, status: "waiting"}
    case SAVE_WELL_PLANS_TO_JSON_RECEIVED:
      return {...state, response: payload, status: "received"}
    case SAVE_WELL_PLANS_TO_JSON_FAILED:
      return {...state, response: payload, status: "failed"}
    default:
      return state;
  }
}