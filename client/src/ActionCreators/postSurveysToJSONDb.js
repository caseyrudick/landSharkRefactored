// import { POST_SURVEYS_TO_JSONDB_REQUESTED, 
//   POST_SURVEYS_TO_JSONDB_RECEIVED, 
//   POST_SURVEYS_TO_JSONDB_FAILED } from "./types"

// import wells from "../APIs/wells"

// export default (wellInfo) => {
//   return async dispatch => {
//     dispatch({
//       type: POST_SURVEYS_TO_JSONDB_REQUESTED
//     })
//     try {
//       let response = await wells.post("Surveys", wellInfo)
//       dispatch({
//         type: POST_SURVEYS_TO_JSONDB_RECEIVED,
//         payload: response.data
//       })
//     } catch (error) {
//       dispatch({
//         type: POST_SURVEYS_TO_JSONDB_FAILED,
//         payload: error
//       })
//     }
//   } 
// }