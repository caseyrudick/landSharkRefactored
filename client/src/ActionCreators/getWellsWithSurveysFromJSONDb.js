// import {
//   GET_WELLS_WITH_SURVEYS_FROM_JSONDB_REQUESTED,
//   GET_WELLS_WITH_SURVEYS_FROM_JSONDB_RECEIVED,
//   GET_WELLS_WITH_SURVEYS_FROM_JSONDB_FAILED
// } from "./types"
// import wells from "../APIs/wells"

// export default () => {
//   return async dispatch => {
//     dispatch({
//       type: GET_WELLS_WITH_SURVEYS_FROM_JSONDB_REQUESTED
//     })
//     try {
//       const response = await wells.get("Surveys")
//       dispatch({
//         type: GET_WELLS_WITH_SURVEYS_FROM_JSONDB_RECEIVED,
//         payload: response.data
//       })
//     } catch (error) {
//       dispatch({
//         type: GET_WELLS_WITH_SURVEYS_FROM_JSONDB_FAILED,
//         payload: error
//       })
//     }
//   }
// }
      