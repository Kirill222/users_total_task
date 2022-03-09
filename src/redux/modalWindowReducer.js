const initialState = {
  isModalFormOpen: false,
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL_FORM':
      return { ...initialState, isModalFormOpen: true }
    case 'CLOSE_MODAL_FORM':
      return { ...initialState, isModalFormOpen: false }
    default:
      return state
  }
}

export default pageReducer
