import { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import axios from 'axios'
import './UserPage.css'

import { FilterForm } from '../../components/FilterForm/FilterForm'
import { SortingForm } from '../../components/SortingForm/SortingForm'
import { UserList } from '../../components/UserList/UserList'

export const UserPage = () => {
  const [users, setUsers] = useState([])
  const [pages, setPages] = useState(0)
  const [count, setCount] = useState(0)

  const [filterBy, setFilterBy] = useState(null)
  const [filterValue, setFiltervalue] = useState('')

  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'https://kirill.totalavengers.com/api/users'
      )
      console.log(response.data.items)
      setUsers(response.data.items)
      setFilteredUsers(response.data.items)
      setPages(response.data.pages)
      setCount(response.data.count)
      return response.data.items
    }

    getData()
  }, [count])

  useEffect(() => {
    console.log(count)
  }, [count, filterValue])

  const paginationHandler = async (e, page) => {
    //window.scrollTo(0, 0)

    const response = await axios.get(
      `https://kirill.totalavengers.com/api/users?page=${page}`
    )

    setUsers(response.data.items)
    setFilteredUsers(response.data.items)
  }

  console.log(filteredUsers)

  // Ordering logic/////////////////////////////////////////////////////////////////////////////
  const [orderBy, setOrderBy] = useState(null)
  const [order, setOrder] = useState(null)

  useEffect(() => {}, [filteredUsers])

  const orderHandler = (e) => {
    setOrder(e.target.value)
    if (order === 'asc') {
      filteredUsers.sort((a, b) => {
        console.log(a[orderBy])
        return a[orderBy] > b[orderBy] ? 1 : -1
      })
    } else {
      filteredUsers.sort((a, b) => {
        console.log(a[orderBy])
        return a[orderBy] < b[orderBy] ? 1 : -1
      })
    }
  }

  // End of ordering logic////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {/* <div
        className='forms'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <FilterForm
          users={users}
          setFilteredUsers={setFilteredUsers}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterValue={filterValue}
          setFiltervalue={setFiltervalue}
        />
        <SortingForm
          filteredUsers={filteredUsers}
          setFilteredUsers={setFilteredUsers}
        />
      </div> */}

      {/*  */}

      {/* 88888888888888888888888888888888888888888888888 */}
      {/* 88888888888888888888888888888888888888888888888 */}

      <form>
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

      {/* 88888888888888888888888888888888888888888888888 */}

      <UserList users={filteredUsers} setCount={setCount} count={count} />

      <div className='pagination-div'>
        <Pagination
          count={pages}
          variant='outlined'
          shape='rounded'
          onChange={(e, page) => paginationHandler(e, page)}
        />
      </div>
    </div>
  )
}
