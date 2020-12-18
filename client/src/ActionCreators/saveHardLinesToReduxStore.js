import { SAVE_HARD_LINES_TO_REDUX_STORE_REQUESTED,
  SAVE_HARD_LINES_TO_REDUX_STORE_RECEIVED,
  SAVE_HARD_LINES_TO_REDUX_STORE_FAILED } from "./types"

export default (leaseLines) => {
  return async dispatch => {
    dispatch({
      type: SAVE_HARD_LINES_TO_REDUX_STORE_REQUESTED
    })
    try {
      dispatch({
        type: SAVE_HARD_LINES_TO_REDUX_STORE_RECEIVED,
        payload: leaseLines
      })
    } catch(error) {
      dispatch({
        type: SAVE_HARD_LINES_TO_REDUX_STORE_FAILED,
        payload: error
      })
    }
  }
}
