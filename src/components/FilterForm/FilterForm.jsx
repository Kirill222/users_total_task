import './FilterForm.css'
import { useState } from 'react'

export const FilterForm = ({
  users,
  setFilteredUsers,
  filterBy,
  setFilterBy,
  filterValue,
  setFiltervalue,
}) => {
  const onFilterChange = (e) => {
    setFiltervalue(e.target.value)
    const filtered = users.filter((u) => {
      const value = u[filterBy]
      if (value.includes(filterValue)) return u
    })
    setFilteredUsers(filtered)
  }

  return (
    <div className='filter-form' style={{ width: '50%' }}>
      <form
        className='form-inline d-flex p-2 align-items-center'
        onSubmit={(e) => e.preventDefault()}
      >
        <select
          onChange={(e) => {
            setFilterBy(e.target.value)
          }}
          className='form-select w-45 m-3'
          aria-label='Default select example'
        >
          <option selected disabled hidden>
            Filter by:
          </option>
          <option value='firstname'>Firstname</option>
          <option value='lastname'>Lastname</option>
          <option value='address'>Address</option>
        </select>

        <input
          type='text'
          className='form-control w-45 m-3'
          id='value'
          placeholder='Value to search'
          name='value'
          value={filterValue}
          onChange={(e) => onFilterChange(e)}
        />
      </form>
    </div>
  )
}
