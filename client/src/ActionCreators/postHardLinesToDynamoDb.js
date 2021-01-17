import axios from "axios"
import moment from "moment"
import {
  POST_HARD_LINES_TO_DYNAMODB_REQUESTED,
  POST_HARD_LINES_TO_DYNAMODB_RECEIVED,
  POST_HARD_LINES_TO_DYNAMODB_FAILED,
} from "./types"

export default ({operator, rig ,well, county, usState, hardLineRecords}) => {
  return async dispatch => {
    dispatch({
      type: POST_HARD_LINES_TO_DYNAMODB_REQUESTED
    })
    try {
      const hardLineInfo = {
        operator,
        rig,
        well,
        county,
        usState,
        hardLineRecords,
        date: moment().format()
      }
      console.log(hardLineRecords)
      const response = await axios.post("https://35q1yjn9z6.execute-api.us-east-2.amazonaws.com/dev/posthardlines", hardLineInfo)
      console.log(response)
      dispatch({
        type: POST_HARD_LINES_TO_DYNAMODB_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: POST_HARD_LINES_TO_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}