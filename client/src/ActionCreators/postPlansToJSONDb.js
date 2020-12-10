import wells from "../APIs/wells"
import { POST_PLANS_TO_JSON_REQUESTED,
  POST_PLANS_TO_JSON_RECEIVED,
  POST_PLANS_TO_JSON_FAILED } from "./types"

export default (wellInfo, wellId) => {
  return async (dispatch, getState) => {

    dispatch({
      type: POST_PLANS_TO_JSON_REQUESTED
    })
    try {
      // let listOfWells = getState().getWellsFromJSONDbReducer 
      const response = await wells.put(`wells/${wellId}`, wellInfo)
      dispatch({
        type: POST_PLANS_TO_JSON_RECEIVED,
        payload: response
      })
    } catch (error) {

      dispatch({
        type: POST_PLANS_TO_JSON_FAILED,
        payload: error
      })
    }
  }
}
