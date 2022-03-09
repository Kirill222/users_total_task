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
