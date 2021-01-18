import axios from "axios"
import {
  GET_LEASE_LINES_FROM_DYNAMODB_REQUESTED,
  GET_LEASE_LINES_FROM_DYNAMODB_RECEIVED,
  GET_LEASE_LINES_FROM_DYNAMODB_FAILED
} from "./types"

export default (selectedWell) => {
  console.log(selectedWell)
  return async dispatch => {
    dispatch({
      type: GET_LEASE_LINES_FROM_DYNAMODB_REQUESTED
    })
    let well = { "item" : selectedWell }
    console.log(well)
    try {
      const response = await axios.post("https://vjdgrewf2h.execute-api.us-east-2.amazonaws.com/dev/getleaselines", well)
      console.log(response)
      dispatch({
        type: GET_LEASE_LINES_FROM_DYNAMODB_RECEIVED,
        payload: response.data
      })
    } catch (error) {
      dispatch({
        type: GET_LEASE_LINES_FROM_DYNAMODB_FAILED,
        payload: error
      })
    }
  }
}