import axios from "axios"
import {
  GET_SURVEYS_FROM_DYNAMODB_REQUESTED,
  GET_SURVEYS_FROM_DYNAMODB_RECEIVED,
  GET_SURVEYS_FROM_DYNAMODB_FAILED
} from "./types"

export default (selectedWell) => {
  console.log(selectedWell)
  return async dispatch => {
    dispatch({
      type: GET_SURVEYS_FROM_DYNAMODB_REQUESTED
    })
    let well = { "item" : selectedWell }
    console.log(well)
    try {
      const response = await axios.post("https://grosy0bvz3.execute-api.us-east-2.amazonaws.com/dev/getsurveys", well)
      console.log(response.data)
      dispatch({
        type: GET_SURVEYS_FROM_DYNAMODB_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: GET_SURVEYS_FROM_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}