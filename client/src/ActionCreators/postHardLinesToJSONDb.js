import { POST_HARD_LINES_TO_JSONDB_REQUESTED,
  POST_HARD_LINES_TO_JSONDB_RECEIVED,
  POST_HARD_LINES_TO_JSONDB_FAILED } from "./types"
import wells from "../APIs/wells"


  export default (wellinfo) => {
    return async dispatch => {
      dispatch({
        type: POST_HARD_LINES_TO_JSONDB_REQUESTED
      })
      try {
        const response = await wells.post("HardLines", wellinfo)
        dispatch({
          type: POST_HARD_LINES_TO_JSONDB_RECEIVED,
          payload: response
        })
      } catch (error) {
        dispatch({
          type: POST_HARD_LINES_TO_JSONDB_FAILED,
          payload: error
        })
      }
    }
  }