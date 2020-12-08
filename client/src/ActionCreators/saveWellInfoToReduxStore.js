import { SAVE_WELL_INFO_TO_REDUX_STORE_REQUESTED,
  SAVE_WELL_INFO_TO_REDUX_STORE_RECEIVED,
  SAVE_WELL_INFO_TO_REDUX_STORE_FAILED } from './types';
  
  export default (wellInfo) => {
    return async (dispatch, getState) => {
      dispatch({
        type: SAVE_WELL_INFO_TO_REDUX_STORE_REQUESTED,
      });
  
      try {
        dispatch({
          type: SAVE_WELL_INFO_TO_REDUX_STORE_RECEIVED,
          payload: wellInfo,
        });
      } catch (error) {
        console.log(error)
        dispatch({
          type: SAVE_WELL_INFO_TO_REDUX_STORE_FAILED,
          payload: error,
        });
      }
    };
  };
  