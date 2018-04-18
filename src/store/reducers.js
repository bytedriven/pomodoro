import { combineReducers } from 'redux'
import exceptionReducer from './exceptions/reducers'
import settingsReducer from './settings/reducers'

const rootReducer = combineReducers({
   settings: settingsReducer,
   exceptions: exceptionReducer,
})

export default rootReducer
