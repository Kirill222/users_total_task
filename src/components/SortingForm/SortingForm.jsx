import './SortingForm.css'
import { useState, useEffect } from 'react'

export const SortingForm = ({ filteredUsers, setFilteredUsers }) => {
  const [orderBy, setOrderBy] = useState(null)
  const [order, setOrder] = useState(null)

  useEffect(() => {}, [filteredUsers])

  const orderHandler = (e) => {
    setOrder(e.target.value)
    if (order === 'asc') {
      const orderedUsers = filteredUsers.sort((a, b) => {
        console.log(a[orderBy])
        return a[orderBy] > b[orderBy] ? 1 : -1
      })
      setFilteredUsers(orderedUsers)
    } else {
      const orderedUsers = filteredUsers.sort((a, b) => {
        console.log(a[orderBy])
        return a[orderBy] < b[orderBy] ? 1 : -1
      })
      setFilteredUsers(orderedUsers)
    }
  }

  return (
    <div>
      <form className='filter-form' style={{ width: '50%' }}>
        <div className='filter-form'>
          <form
            className='form-inline d-flex p-2 align-items-center'
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              onChange={(e) => {
                setOrderBy(e.target.value)
                console.log(e.target.value)
              }}
              className='form-select w-45 m-3'
              aria-label='Default select example'
            >
              <option selected disabled hidden>
                Sort by:
              </option>
              <option value='firstname'>Firstname</option>
              <option value='lastname'>Lastname</option>
              <option value='address'>Address</option>
            </select>

            <select
              onChange={(e) => {
                orderHandler(e)
              }}
              className='form-select w-45 m-3'
              aria-label='Default select example'
            >
              <option selected disabled hidden>
                Order:
              </option>
              <option value='asc'>ASC</option>
              <option value='dsc'>DSC</option>
            </select>
          </form>
        </div>
      </form>
    </div>
  )
}
