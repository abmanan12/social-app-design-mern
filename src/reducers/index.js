import { combineReducers } from 'redux'

import authReducer from './AuthReducers'
import postReducer from './PostReducers'

export const reducers = combineReducers({ authReducer, postReducer })