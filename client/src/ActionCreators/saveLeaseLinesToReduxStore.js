import { SAVE_LEASE_LINES_TO_REDUX_STORE_REQUESTED,
  SAVE_LEASE_LINES_TO_REDUX_STORE_RECEIVED,
  SAVE_LEASE_LINES_TO_REDUX_STORE_FAILED } from "./types"

export default (leaseLines) => {
  return dispatch => {
    dispatch({
      type: SAVE_LEASE_LINES_TO_REDUX_STORE_REQUESTED
    })
    try {
      dispatch({
        type: SAVE_LEASE_LINES_TO_REDUX_STORE_RECEIVED,
        payload: leaseLines
      })
    } catch(error) {
      dispatch({
        type: SAVE_LEASE_LINES_TO_REDUX_STORE_FAILED,
        payload: error
      })
    }
  }
}
