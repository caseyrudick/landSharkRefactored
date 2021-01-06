import { SAVE_SURVEYS_TO_REDUX_STORE_REQUESTED, 
  SAVE_SURVEYS_TO_REDUX_STORE_RECEIVED,
  SAVE_SURVEYS_TO_REDUX_STORE_FAILED } from "./types"


  export default (wellData) => {
    return async dispatch => {
      dispatch ({
        type: SAVE_SURVEYS_TO_REDUX_STORE_REQUESTED
      })
      try {
        dispatch({
          type: SAVE_SURVEYS_TO_REDUX_STORE_RECEIVED,
          payload: wellData
        })
      } catch (error) {
        dispatch({
          type: SAVE_SURVEYS_TO_REDUX_STORE_FAILED,
          payload: error
        })
      }
    }
  }