import { combineReducers } from 'redux'

import pageReducer from './pageReducer'
import usersReducer from './usersReducer'
import modalWindowReducer from './modalWindowReducer'
import editedUserReducer from './editedUserReducer'

const reducers = combineReducers({
  page: pageReducer,
  users: usersReducer,
  modalWindow: modalWindowReducer,
  editedUser: editedUserReducer,
})

export default reducers
