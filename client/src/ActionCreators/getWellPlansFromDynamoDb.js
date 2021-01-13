import axios from "axios"
import {
  GET_WELL_PLANS_FROM_DYNAMODB_REQUESTED,
  GET_WELL_PLANS_FROM_DYNAMODB_RECEIVED,
  GET_WELL_PLANS_FROM_DYNAMODB_FAILED
} from "./types"

export default (selectedWell) => {
  return async dispatch => {
    dispatch({
      type: GET_WELL_PLANS_FROM_DYNAMODB_REQUESTED
    })
    try {
      const response = await axios.get("https://0vpisbh32h.execute-api.us-east-2.amazonaws.com/dev/getplans", selectedWell)
      dispatch({
        type: GET_WELL_PLANS_FROM_DYNAMODB_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: GET_WELL_PLANS_FROM_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}