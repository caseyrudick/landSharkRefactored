import wells from "../APIs/wells"
import { SAVE_WELL_PLANS_TO_JSON_REQUESTED,
  SAVE_WELL_PLANS_TO_JSON_RECEIVED,
  SAVE_WELL_PLANS_TO_JSON_FAILED } from "./types"

export default (wellInfo, wellId) => {
  return async (dispatch, getState) => {

    dispatch({
      type: SAVE_WELL_PLANS_TO_JSON_REQUESTED
    })
    try {
      // let listOfWells = getState().getWellsFromJSONDbReducer 
      const response = await wells.put(`wells/${wellId}`, wellInfo)
      dispatch({
        type: SAVE_WELL_PLANS_TO_JSON_RECEIVED,
        payload: response
      })
    } catch (error) {

      dispatch({
        type: SAVE_WELL_PLANS_TO_JSON_FAILED,
        payload: error
      })
    }
  }
}
