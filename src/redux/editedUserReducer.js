const initialState = {
  editedUserId: null,
}

const editedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EDITED_USER_ID':
      return { ...initialState, editedUserId: action.payload }
    default:
      return state
  }
}

export default editedUserReducer
