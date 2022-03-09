const initialState = {
  users: [],
  filteredUsers: [],
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...initialState, users: [...action.payload] }
    case 'SET_FILTERED_USERS':
      return { ...initialState, filteredUsers: [...action.payload] }
    default:
      return state
  }
}

export default pageReducer
