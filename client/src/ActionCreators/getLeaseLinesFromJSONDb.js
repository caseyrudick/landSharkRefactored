import { GET_LEASE_LINES_FROM_JSONDB_REQUESTED,
  GET_LEASE_LINES_FROM_JSONDB_RECEIVED,
  GET_LEASE_LINES_FROM_JSONDB_FAILED } from "./types"

  export default (selectedWell) => {
    return async (dispatch, getState) => {
      dispatch({
        type: GET_LEASE_LINES_FROM_JSONDB_REQUESTED
      })
      try {
        const selectedWellConvertedToArray = selectedWell.split("-").map(word => word.trim())
        const selectedWellOperator = selectedWellConvertedToArray[0]
        const selectedWell_Well = selectedWellConvertedToArray[2]
        let wells = getState().getWellsWithLeaseLinesFromJSONDbReducer.response
        // console.log(getState().getWellsWithLeaseLinesFromJSONDbReducer.response)
        let result = wells.filter(well => {
          return well.operator === selectedWellOperator && well.well === selectedWell_Well
        })
        dispatch({
          type: GET_LEASE_LINES_FROM_JSONDB_RECEIVED,
          payload: result[0].grid
        })
      } catch (error) {
        dispatch({
          type: GET_LEASE_LINES_FROM_JSONDB_FAILED,
          payload: error
        })
      }
    }
  }
