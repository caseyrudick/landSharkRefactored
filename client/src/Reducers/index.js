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


export default combineReducers({
  getWellPlansFromJSONDbReducer,
  saveWellInfoToReduxStoreReducer,  
  postWellInfoToJSONDbReducer,
  getWellsFromJSONDbReducer,
  savePlansToReduxStoreReducer,
  postPlansToJSONDbReducer,
  activeWell: saveActiveWellToReduxStoreReducer,
  saveLeaseLinesToReduxStoreReducer
})