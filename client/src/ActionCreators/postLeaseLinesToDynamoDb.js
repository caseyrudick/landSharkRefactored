import axios from "axios"
import moment from "moment"
import {
  POST_LEASE_LINES_TO_DYNAMODB_REQUESTED,
  POST_LEASE_LINES_TO_DYNAMODB_RECEIVED,
  POST_LEASE_LINES_TO_DYNAMODB_FAILED,
} from "./types"

export default ({operator, rig ,well, county, usState, leaseLines}) => {
  return async dispatch => {
    dispatch({
      type: POST_LEASE_LINES_TO_DYNAMODB_REQUESTED
    })
    try {
      const LeaseLinesInfo = {
        operator,
        rig,
        well,
        county,
        usState,
        leaseLines,
        date: moment().format()
      }
      const response = await axios.post("https://vjdgrewf2h.execute-api.us-east-2.amazonaws.com/dev/postleaselines", LeaseLinesInfo)
      console.log(response)
      dispatch({
        type: POST_LEASE_LINES_TO_DYNAMODB_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: POST_LEASE_LINES_TO_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}