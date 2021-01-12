import axios from "axios"
import {
  GET_WELLS_FROM_DYNAMO_REQUESTED,
  GET_WELLS_FROM_DYNAMO_RECEIVED,
  GET_WELLS_FROM_DYNAMO_FAILED
} from "./types"

export default () => {
  return async dispatch => {
    dispatch({
      type: GET_WELLS_FROM_DYNAMO_REQUESTED
    })
    try {
      const response = await axios.get("https://0vpisbh32h.execute-api.us-east-2.amazonaws.com/dev/getwells")
      dispatch({
        type: GET_WELLS_FROM_DYNAMO_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: GET_WELLS_FROM_DYNAMO_FAILED,
        payload: error
      })
    }
  }
}