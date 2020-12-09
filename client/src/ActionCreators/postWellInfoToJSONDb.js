import wells from "../APIs/wells"

import { POST_WELLINFO_TO_JSONDB_REQUESTED,
  POST_WELLINFO_TO_JSONDB_RECEIVED,
  POST_WELLINFO_TO_JSONDB_FAILED } from './types';
  
  export default (wellInfo) => {

    return async (dispatch, getState) => {
      // let wellList = getState().getWellsFromJSONDbReducer.response
      // console.log('should get wellList next')
      // console.log(wellList)
      const response = await wells.post("/wells", wellInfo)
      dispatch({
        type: POST_WELLINFO_TO_JSONDB_REQUESTED,
      });
  
      try {
        dispatch({
          type: POST_WELLINFO_TO_JSONDB_RECEIVED,
          payload: wellInfo,
        });
      } catch (error) {
        console.log(error)
        dispatch({
          type: POST_WELLINFO_TO_JSONDB_FAILED,
          payload: error,
        });
      }
    };
  };
  