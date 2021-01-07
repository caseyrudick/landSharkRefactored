import { SIGN_UP_REQUESTED,
  SIGN_UP_RECEIVED,
  SIGN_UP_FAILED
} from "../types"

export default (bool) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SIGN_UP_REQUESTED
    });
    
    try {
      dispatch({
        type: SIGN_UP_RECEIVED,
        payload: bool,
      });
    } catch (error) {
      dispatch({
        type: SIGN_UP_FAILED,
        payload: error
      })
    }
  }
}