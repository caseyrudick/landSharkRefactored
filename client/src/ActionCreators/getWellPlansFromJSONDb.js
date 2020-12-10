import wells from "../APIs/wells"
import { GET_WELL_PLANS_FROM_JSONDB_REQUESTED, 
  GET_WELL_PLANS_FROM_JSONDB_RECEIVED,
  GET_WELL_PLANS_FROM_JSONDB_FAILED} from "./types"

export default (well) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_WELL_PLANS_FROM_JSONDB_REQUESTED
    })
    try {
      const response = await wells.get("/wells")
      dispatch({
        type: GET_WELL_PLANS_FROM_JSONDB_RECEIVED,
        payload: response
      })
    } catch(error) {
      dispatch({
        type: GET_WELL_PLANS_FROM_JSONDB_FAILED,
        payload: error
      })
    }
  }
}