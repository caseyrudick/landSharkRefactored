import { 
  GET_HARD_LINES_LIST_FROM_JSONDB_REQUESTED,
  GET_HARD_LINES_LIST_FROM_JSONDB_RECEIVED,
  GET_HARD_LINES_LIST_FROM_JSONDB_FAILED
} from "./types"

import wells from "../APIs/wells"


export default () => {
  return async dispatch => {
    dispatch({
      type: GET_HARD_LINES_LIST_FROM_JSONDB_REQUESTED
    })
    try {
      const response = await wells.get("/HardLines")
      dispatch({
        type: GET_HARD_LINES_LIST_FROM_JSONDB_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: GET_HARD_LINES_LIST_FROM_JSONDB_FAILED,
        payload: error
      })
    }
  }
}