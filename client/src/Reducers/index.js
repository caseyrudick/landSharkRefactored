import { combineReducers } from "redux"
// import wellsReducer from "./wellsReducer"
// import selectWellFromReduxStoreReducer from "./selectWellFromReduxStoreReducer"
// import postPlansToJSONdb from "./postPlansToJSONdb"
import saveWellInfoToReduxStoreReducer from "./saveWellInfoToReduxStoreReducer"
import postWellInfoToJSONDbReducer from "./postWellInfoToJSONDbReducer"
import getWellsFromJSONDbReducer from "./getWellsFromJSONDbReducer"

export default combineReducers({
  saveWellInfoToReduxStoreReducer,
  postWellInfoToJSONDbReducer,
  getWellsFromJSONDbReducer
})