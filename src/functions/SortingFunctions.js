export const ascOrder = (array, orderBy) => {
  const sortedArray = array.sort((a, b) => {
    return a[orderBy] < b[orderBy] ? 1 : -1
  })
  return sortedArray
}

export const descOrder = (array, orderBy) => {
  const sortedArray = array.sort((a, b) => {
    return a[orderBy] > b[orderBy] ? 1 : -1
  })
  return sortedArray
}
