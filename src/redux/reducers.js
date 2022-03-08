import { combineReducers } from 'redux'

import pageReducer from './pageReducer'
import usersReducer from './usersReducer'

const reducers = combineReducers({
  page: pageReducer,
  users: usersReducer,
})

export default reducers
