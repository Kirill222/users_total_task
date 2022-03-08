export const ascOrder = (array, orderBy) => {
  array.sort((a, b) => {
    console.log(a[orderBy])
    return a[orderBy] < b[orderBy] ? 1 : -1
  })
}

export const descOrder = (array, orderBy) => {
  array.sort((a, b) => {
    console.log(a[orderBy])
    return a[orderBy] > b[orderBy] ? 1 : -1
  })
}
