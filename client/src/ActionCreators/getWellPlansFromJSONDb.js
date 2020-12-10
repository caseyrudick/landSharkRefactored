import { get } from "lodash"
import wells from "../APIs/wells"
import getWellsFromJSONDb from "./getWellsFromJSONDb"
import { GET_WELL_PLANS_FROM_JSONDB_REQUESTED, 
  GET_WELL_PLANS_FROM_JSONDB_RECEIVED,
  GET_WELL_PLANS_FROM_JSONDB_FAILED} from "./types"

export default (selectedWell) => {
  return async (dispatch, getState) => {
    
    dispatch({
      type: GET_WELL_PLANS_FROM_JSONDB_REQUESTED
    })
    try {
      let result=null;
      const wellList = getState().getWellsFromJSONDbReducer.response
      const selectedWellConvertedToArray = selectedWell.split("-").map(word => word.trim())
      const selectedWellOperator = selectedWellConvertedToArray[0]
      const selectedWellWell = selectedWellConvertedToArray[3]
      for (let well in wellList) {
        if (wellList[well].operator === selectedWellOperator && wellList[well].well === selectedWellWell) {

      
          result = [...wellList[well].grid]
        }
      }
      console.log(result)
      dispatch({
        
        type: GET_WELL_PLANS_FROM_JSONDB_RECEIVED,
        payload: result
      }) 
    } catch (error) {
      
      dispatch({
        type: GET_WELL_PLANS_FROM_JSONDB_FAILED,
        payload: error
      })
    }
  }
} 


    // have a well, for (well in getState.getWellsFromJSONDbReducer.response) {
        // if (getState.getWellsFromJSONDbReducer.response[well].operator )
    // }

