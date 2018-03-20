import { combineReducers } from 'redux'
import leetProbReducer from './leetProbReducer'
import authReducer from './authReducer'
import solutionReducer from './solutionReducer'

export default combineReducers({
  problems: leetProbReducer,
  auth: authReducer,
  solutions: solutionReducer
})