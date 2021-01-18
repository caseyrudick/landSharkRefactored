import axios from "axios"
import { 
  POST_PLANS_TO_DYNAMODB_REQUESTED,
  POST_PLANS_TO_DYNAMODB_RECEIVED,
  POST_PLANS_TO_DYNAMODB_FAILED 
} from "./types"
import moment from "moment"

export default (operator, rig ,well, county, usState, planRecords, northing, easting,vsDirection = 0) => {
  return async (dispatch, getState) => {

    dispatch({
      type: POST_PLANS_TO_DYNAMODB_REQUESTED
    })
    try {
      const wellInfo = {
        operator,
        rig,
        well,
        county,
        usState,
        vsDirection,
        planRecords,
        northing, 
        easting, 
        date: moment().format()
      }
      const response = await axios.post(`https://0vpisbh32h.execute-api.us-east-2.amazonaws.com/dev/postplans`, wellInfo)
      console.log(response.data)
      dispatch({
        type: POST_PLANS_TO_DYNAMODB_RECEIVED,
        payload: response
      })
    } catch (error) {

      dispatch({
        type: POST_PLANS_TO_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}
