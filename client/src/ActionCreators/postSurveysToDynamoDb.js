import axios from "axios"
import { 
  POST_SURVEYS_TO_DYNAMODB_REQUESTED,
  POST_SURVEYS_TO_DYNAMODB_RECEIVED,
  POST_SURVEYS_TO_DYNAMODB_FAILED 
} from "./types"
import moment from "moment"

export default ({operator, rig ,well, county, usState, surveys, northing, easting,vsDirection = 0}) => {
  return async (dispatch, getState) => {

    dispatch({
      type: POST_SURVEYS_TO_DYNAMODB_REQUESTED
    })
    try {
      const wellInfo = {
        operator,
        rig,
        well,
        county,
        usState,
        vsDirection,
        surveys,
        northing, 
        easting, 
        date: moment().format()
      }
      const response = await axios.post(`https://grosy0bvz3.execute-api.us-east-2.amazonaws.com/dev/postsurveys`, wellInfo)
      console.log(response.data)
      dispatch({
        type: POST_SURVEYS_TO_DYNAMODB_RECEIVED,
        payload: response,
        surveys: wellInfo.surveys 

      })
    } catch (error) {

      dispatch({
        type: POST_SURVEYS_TO_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}
