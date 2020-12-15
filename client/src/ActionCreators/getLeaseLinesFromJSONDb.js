import {GET_LEASE_LINES_FROM_JSONDB_REQUESTED,
  GET_LEASE_LINES_FROM_JSONDB_RECEIVED,
  GET_LEASE_LINES_FROM_JSONDB_FAILED} from "./types"
import wells from "../APIs/wells"
  export default (selectedWell, getState) => {
    console.log(selectedWell)
    return async dispatch => {
      dispatch({
        type: GET_LEASE_LINES_FROM_JSONDB_REQUESTED
      })
      try {
        let result = null;
        const response = await wells.get("LeaseLines")
        const listOfWells = response.data
        console.log(listOfWells)
        const selectedWellConvertedToArray = selectedWell.split("-").map(word => word.trim())
        const selectedWellOperator = selectedWellConvertedToArray[0]
        const selectedWell_Well = selectedWellConvertedToArray[2]
        for (let well in listOfWells) {
          if (listOfWells[well].operator === selectedWellOperator && listOfWells[well].well === selectedWell_Well) {
            result = [...listOfWells[well].grid]
          }
        }
        dispatch({
          type: GET_LEASE_LINES_FROM_JSONDB_RECEIVED,
          payload: result
        })
      } catch (error) {
        dispatch({
          type: GET_LEASE_LINES_FROM_JSONDB_FAILED,
          payload: error
        })
      }
    }
  }