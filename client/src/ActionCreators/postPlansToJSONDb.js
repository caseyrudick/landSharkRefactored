import wells from "../APIs/wells"
import { POST_PLANS_TO_JSON_REQUESTED,
  POST_PLANS_TO_JSON_RECEIVED,
  POST_PLANS_TO_JSON_FAILED } from "./types"
import moment from "moment"

export default (grid, vsDirection ,well, operator, rig, county, uSstate) => {
  return async (dispatch, getState) => {

    dispatch({
      type: POST_PLANS_TO_JSON_REQUESTED
    })
    try {
      const wellData = {
        grid, 
        vsDirection, 
        well,
        operator,
        rig,
        county,
        uSstate,
        date: moment().format(),
      }
      const response = await wells.post(`wells`, wellData)
      dispatch({
        type: POST_PLANS_TO_JSON_RECEIVED,
        payload: response.data
      })
    } catch (error) {

      dispatch({
        type: POST_PLANS_TO_JSON_FAILED,
        payload: error
      })
    }
  }
}
