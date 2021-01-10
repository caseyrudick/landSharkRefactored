import axios from "axios"
import { 
  POST_WELL_INFO_TO_DYNAMODB_REQUESTED,
  POST_WELL_INFO_TO_DYNAMODB_RECEIVED,
  POST_WELL_INFO_TO_DYNAMODB_FAILED
} from "./types"
import moment from "moment"

export default (wellInfo) => {
  return async (dispatch, getState) => {

    dispatch({
      type: POST_WELL_INFO_TO_DYNAMODB_REQUESTED
    })
    try {
      const response = await axios.post(`https://l9vksep5eb.execute-api.us-east-2.amazonaws.com/dev/postwellinfotodynamodb`, wellInfo)
      dispatch({
        type: POST_WELL_INFO_TO_DYNAMODB_RECEIVED,
        payload: response.data
      })
    } catch (error) {

      dispatch({
        type: POST_WELL_INFO_TO_DYNAMODB_FAILED,
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