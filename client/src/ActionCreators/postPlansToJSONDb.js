import wells from "../APIs/wells"
import { POST_PLANS_TO_JSON_REQUESTED,
  POST_PLANS_TO_JSON_RECEIVED,
  POST_PLANS_TO_JSON_FAILED } from "./types"
import moment from "moment"

export default (operator, rig ,well, county, uSstate, grid, vsDirection) => {
  return async (dispatch, getState) => {

    dispatch({
      type: POST_PLANS_TO_JSON_REQUESTED
    })
    try {
      const wellData = {
        operator,
        rig,
        well,
        county,
        uSstate,
        vsDirection,
        grid, 
        date: moment().format()
      }
      console.log(wellData)
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
