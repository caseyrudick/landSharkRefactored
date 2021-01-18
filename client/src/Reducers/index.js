import { combineReducers } from "redux"
// import wellsReducer from "./wellsReducer"
// import selectWellFromReduxStoreReducer from "./selectWellFromReduxStoreReducer"
// import postPlansToJSONdb from "./postPlansToJSONdb"
import saveWellInfoToReduxStoreReducer from "./saveWellInfoToReduxStoreReducer"
import savePlansToReduxStoreReducer from "./savePlansToReduxStoreReducer"
import saveActiveWellToReduxStoreReducer from "./saveActiveWellToReduxStoreReducer"
import saveLeaseLinesToReduxStoreReducer from "./saveLeaseLinesToReduxStoreReducer"
import saveSurveysToReduxStoreReducer from "./saveSurveysToReduxStoreReducer"
import saveHardLinesToReduxStoreReducer from "./saveHardLinesToReduxStoreReducer"
import postWellInfoToDynamoDbReducer from "./postWellInfoToDynamoDbReducer"
import postPlansToDynamoDbReducer from "./postPlansToDynamoDbReducer"
import getWellsFromDynamoDbReducer from "./getWellsFromDynamoDbReducer"
import getWellPlansFromDynamoDbReducer from "./getWellPlansFromDynamoDbReducer"
import postHardLinesToDynamoDbReducer from "./postHardLinesToDynamoDbReducer"
import postLeaseLinesToDynamoDbReducer from "./postLeaseLinesToDynamoDbReducer"
import postSurveysToDynamoDbReducer from "./postSurveysToDynamoDbReducer"
import getLeaseLinesFromDynamoDbReducer from "./getLeaseLinesFromDynamoDbReducer"
import getHardLinesFromDynamoDbReducer from "./getHardLinesFromDynamoDbReducer"
import getSurveysFromDynamoDbReducer from "./getSurveysFromDynamoDbReducer"

export default combineReducers({


  // getWellsWithLeaseLinesFromJSONDbReducer,
  // getWellsWithSurveysFromJSONDbReducer,
  // getWellsWithHardLinesFromJSONDbReducer,

  getWellsFromDynamoDbReducer,
  getWellPlansFromDynamoDbReducer, 
  getLeaseLinesFromDynamoDbReducer,
  getHardLinesFromDynamoDbReducer,
  // getWellPlansFromJSONDbReducer,
  // getLeaseLinesFromJSONDbReducer,
  // getSurveysFromJSONDbReducer,
  // getHardLinesFromJSONDbReducer,
  
  // postWellInfoToJSONDbReducer,
  // postPlansToJSONDbReducer,
  // postLeaseLinesToJSONDbReducer,
  // postSurveysToJSONDbReducer,
  // postHardLinesToJSONDbReducer,
  postPlansToDynamoDbReducer,
  postHardLinesToDynamoDbReducer,
  postWellInfoToDynamoDbReducer,
  postLeaseLinesToDynamoDbReducer,
  postSurveysToDynamoDbReducer,

  saveWellInfoToReduxStoreReducer,  
  savePlansToReduxStoreReducer,
  saveLeaseLinesToReduxStoreReducer,
  saveSurveysToReduxStoreReducer,
  saveHardLinesToReduxStoreReducer,

  activeWell: saveActiveWellToReduxStoreReducer,

})