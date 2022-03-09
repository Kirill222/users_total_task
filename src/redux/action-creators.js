export const setPageNumberAC = (pageNumber) => {
  return {
    type: 'SET_PAGE_NUMBER',
    payload: pageNumber,
  }
}

export const setUserssAC = (users) => {
  return {
    type: 'SET_USERS',
    payload: users,
  }
}

export const setFilteredUsersAC = (users) => {
  return {
    type: 'SET_FILTERED_USERS',
    payload: users,
  }
}

export const setEditedUserIdAC = (userId) => {
  return {
    type: 'SET_EDITED_USER_ID',
    payload: userId,
  }
}

export const openModalFormAC = () => {
  return {
    type: 'OPEN_MODAL_FORM',
  }
}
export const closeModalFormAC = () => {
  return {
    type: 'CLOSE_MODAL_FORM',
  }
}
