import wells from "../APIs/wells"

import { GET_WELLS_FROM_JSON_REQUESTED,
  GET_WELLS_FROM_JSON_RECEIVED,
  GET_WELLS_FROM_JSON_FAILED } from "./types"


export default () => {
  return async dispatch => {
    dispatch({
      type: GET_WELLS_FROM_JSON_REQUESTED
    })
    try {
      const response = await wells.get("/wells")
      dispatch({
        type: GET_WELLS_FROM_JSON_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: GET_WELLS_FROM_JSON_FAILED,
        payload: error
      })
    }
  }
}