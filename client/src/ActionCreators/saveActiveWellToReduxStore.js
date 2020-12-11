import { SAVE_ACTIVE_WELL_TO_REDUX_STORE_REQUESTED,
  SAVE_ACTIVE_WELL_TO_REDUX_STORE_RECEIVED,
  SAVE_ACTIVE_WELL_TO_REDUX_STORE_FAILED
 } from "./types"

export default (selectedWell) => {
  return (dispatch) => {
    dispatch ({
      type: SAVE_ACTIVE_WELL_TO_REDUX_STORE_REQUESTED
    });
    try {
      dispatch({
        type: SAVE_ACTIVE_WELL_TO_REDUX_STORE_RECEIVED,
        payload: selectedWell
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: SAVE_ACTIVE_WELL_TO_REDUX_STORE_FAILED,
        payload: error
      })
    }
  }
}