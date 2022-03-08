const initialState = {
  pageNumber: 1,
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return { ...initialState, pageNumber: action.payload }
    default:
      return state
  }
}

export default pageReducer
