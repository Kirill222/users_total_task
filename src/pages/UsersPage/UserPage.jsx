import { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import axios from 'axios'
import './UserPage.css'
import { ascOrder, descOrder } from '../../functions/SortingFunctions'
import { UserList } from '../../components/UserList/UserList'

//Redux stuff
import { useSelector, useDispatch } from 'react-redux'
import {
  setPageNumberAC,
  setUsersAC,
  setFilteredUsersAC,
} from '../../redux/action-creators'

export const UserPage = () => {
  //const [users, setUsers] = useState([])
  const users = useSelector((state) => state.users.users)
  const [pages, setPages] = useState(0)
  const [count, setCount] = useState(0)

  const [orderBy, setOrderBy] = useState(null)
  const [order, setOrder] = useState(null)

  const dispatch = useDispatch()

  const [filterBy, setFilterBy] = useState(null)
  const [filterValue, setFiltervalue] = useState('')

  //const [filteredUsers, setFilteredUsers] = useState([])
  const filteredUsers = useSelector((state) => state.users.filteredUsers)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'https://kirill.totalavengers.com/api/users'
      )
      console.log(response.data.items)
      //setUsers(response.data.items)
      //setFilteredUsers(response.data.items)
      setPages(response.data.pages)
      setCount(response.data.count)

      dispatch(setUsersAC(response.data.items))
      dispatch(setFilteredUsersAC(response.data.items))

      return response.data.items
    }

    getData()
  }, [count])

  useEffect(() => {
    console.log(count)
  }, [count, filterValue])

  const paginationHandler = async (e, page) => {
    dispatch(setPageNumberAC(page))

    const response = await axios.get(
      `https://kirill.totalavengers.com/api/users?page=${page}`
    )

    //setUsers(response.data.items)
    dispatch(setUsersAC(response.data.items))
    //setFilteredUsers(response.data.items)
    // let sorted
    // if (order === 'asc') {
    //   sorted = ascOrder(response.data.items, orderBy)
    // } else if (order === 'desc') {
    //   sorted = descOrder(response.data.items, orderBy)
    // } else {
    //   sorted = response.data.items
    // }
    // dispatch(setFilteredUsersAC(sorted))
    dispatch(setFilteredUsersAC(response.data.items))
  }

  //console.log(filteredUsers)

  // Filtering logic starts/////////////////////////////////////////////////////////////////////////////

  const onFilterChange = (e) => {
    setFiltervalue(e.target.value)
    const filtered = users.filter((u) => {
      const value = u[filterBy]
      if (value.includes(filterValue)) return u
    })
    //setFilteredUsers(filtered)
    dispatch(setFilteredUsersAC(filtered))
  }

  // Filtering logic ends/////////////////////////////////////////////////////////////////////////////

  // Ordering logic/////////////////////////////////////////////////////////////////////////////

  useEffect(() => {}, [filteredUsers])

  const orderHandler = (e) => {
    setOrder(e.target.value)
    if (order === 'asc') {
      ascOrder(filteredUsers, orderBy)
    } else if (order === 'desc') {
      descOrder(filteredUsers, orderBy)
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

      {/* Filter form starts *************************** */}

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

      {/* Filter form ends **************************** */}

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
              <option value='desc'>DESC</option>
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
