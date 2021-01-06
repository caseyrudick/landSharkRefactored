import { SAVE_PLANS_TO_REDUX_STORE_REQUESTED,
  SAVE_PLANS_TO_REDUX_STORE_RECEIVED,
  SAVE_PLANS_TO_REDUX_STORE_FAILED
} from "./types"

export default (plans) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_PLANS_TO_REDUX_STORE_REQUESTED
    });
    
    try {
      dispatch({
        type: SAVE_PLANS_TO_REDUX_STORE_RECEIVED,
        payload: plans,
      });
    } catch (error) {
      dispatch({
        type: SAVE_PLANS_TO_REDUX_STORE_FAILED,
        payload: error
      })
    }
  }
}