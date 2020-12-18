import { combineReducers } from "redux"
// import wellsReducer from "./wellsReducer"
// import selectWellFromReduxStoreReducer from "./selectWellFromReduxStoreReducer"
// import postPlansToJSONdb from "./postPlansToJSONdb"
import saveWellInfoToReduxStoreReducer from "./saveWellInfoToReduxStoreReducer"
import postWellInfoToJSONDbReducer from "./postWellInfoToJSONDbReducer"
import getWellsFromJSONDbReducer from "./getWellsFromJSONDbReducer"
import postPlansToJSONDbReducer from "./postPlansToJSONDbReducer"
import savePlansToReduxStoreReducer from "./savePlansToReduxStoreReducer"
import getWellPlansFromJSONDbReducer from "./getWellPlansFromJSONDbReducer"
import saveActiveWellToReduxStoreReducer from "./saveActiveWellToReduxStoreReducer"
import saveLeaseLinesToReduxStoreReducer from "./saveLeaseLinesToReduxStoreReducer"
import postLeaseLinesToJSONDbReducer from "./postLeaseLinesToJSONDbReducer"
import getLeaseLinesFromJSONDbReducer from "./getLeaseLinesFromJSONDbReducer"
import getWellsWithLeaseLinesFromJSONDbReducer from "./getWellsWithLeaseLinesFromJSONDbReducer"
import saveSurveysToReduxStoreReducer from "./saveSurveysToReduxStoreReducer"
import postSurveysToJSONDbReducer from "./postSurveysToJSONDbReducer"
import getWellsWithSurveysFromJSONDbReducer from "./getWellsWithSurveysFromJSONDbReducer"
import getSurveysFromJSONDbReducer from "./getSurveysFromJSONDbReducer"
import postHardLinesToJSONDbReducer from "./postHardLinesToJSONDbReducer"
import saveHardLinesToReduxStoreReducer from "./saveHardLinesToReduxStoreReducer"
import getWellsWithHardLinesFromJSONDbReducer from "./getWellsWithHardLinesFromJSONDbReducer"
import getHardLinesFromJSONDbReducer from "./getHardLinesFromJSONDbReducer"


export default combineReducers({
  getWellsFromJSONDbReducer,
  getWellsWithLeaseLinesFromJSONDbReducer,
  getWellsWithSurveysFromJSONDbReducer,
  getWellsWithHardLinesFromJSONDbReducer,

  getWellPlansFromJSONDbReducer,
  getLeaseLinesFromJSONDbReducer,
  getSurveysFromJSONDbReducer,
  getHardLinesFromJSONDbReducer,
  
  postWellInfoToJSONDbReducer,
  postPlansToJSONDbReducer,
  postLeaseLinesToJSONDbReducer,
  postSurveysToJSONDbReducer,
  postHardLinesToJSONDbReducer,

  saveWellInfoToReduxStoreReducer,  
  savePlansToReduxStoreReducer,
  saveLeaseLinesToReduxStoreReducer,
  saveSurveysToReduxStoreReducer,
  saveHardLinesToReduxStoreReducer,


  activeWell: saveActiveWellToReduxStoreReducer,
  
})