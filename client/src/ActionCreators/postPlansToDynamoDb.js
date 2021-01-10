import wells from "../APIs/wells"
import { 
  POST_PLANS_TO_DYNAMODB_REQUESTED,
  POST_PLANS_TO_DYNAMODB_RECEIVED,
  POST_PLANS_TO_DYNAMODB_FAILED 
} from "./types"
import moment from "moment"

export default (operator, rig ,well, county, uSstate, grid, vsDirection) => {
  return async (dispatch, getState) => {

    dispatch({
      type: POST_PLANS_TO_DYNAMODB_REQUESTED
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
      const response = await wells.post(`wells`, wellData)
      dispatch({
        type: POST_PLANS_TO_DYNAMODB_RECEIVED,
        payload: response.data
      })
    } catch (error) {

      dispatch({
        type: POST_PLANS_TO_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}


// wellData = {
//   "operator": "EOG"
//   "rig": "H&P425"
//   "well": "RyPepp"
//   "county": "Lea"
//   "uSstate": "NM"
// }