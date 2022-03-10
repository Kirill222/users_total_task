import { useState, useEffect, useRef } from 'react'
import Pagination from '@mui/material/Pagination'
import axios from 'axios'
import './UserPage.css'
import { ascOrder, descOrder } from '../../functions/SortingFunctions'
import { UserList } from '../../components/UserList/UserList'
import { useSelector, useDispatch } from 'react-redux'
import {
  setPageNumberAC,
  setUserssAC,
  setFilteredUsersAC,
} from '../../redux/action-creators'

export const UserPage = () => {
  const [usersS, setUsersS] = useState([])
  const filteredUsers = useSelector((state) => state.users.filteredUsers)
  const [pages, setPages] = useState(0)
  const [count, setCount] = useState(0)
  const [orderBy, setOrderBy] = useState('firstname')
  const [order, setOrder] = useState('asc')
  const [filterBy, setFilterBy] = useState(null)
  const [filterValue, setFilterValue] = useState('')
  const isModalFormOpen = useSelector(
    (state) => state.modalWindow.isModalFormOpen
  )
  const dispatch = useDispatch()

  /////////////////////////////////////////////////////////////INITIAL USEEFFECT
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://kirill.totalavengers.com/api/users/?sort=${orderBy}_${order}`
      )
      console.log(response.data.items)
      setPages(response.data.pages)
      setCount(response.data.count)
      setUsersS(response.data.items)
      dispatch(setUserssAC(response.data.items))
      dispatch(setUserssAC(response.data.items))
      dispatch(setFilteredUsersAC(response.data.items))
    }
    getData()
  }, [count])

  //ORDERBY LOGIC
  const orderByRef = useRef()
  const orderRef = useRef()
  const onOrderByHandlerRef = () => {
    setOrderBy(orderByRef.current.value)
    setOrder(orderRef.current.value)
    const getData = async () => {
      const response = await axios.get(
        `https://kirill.totalavengers.com/api/users/?sort=${orderBy}_${order}`
      )
      console.log(response.data.items)
      setPages(response.data.pages)
      setCount(response.data.count)
      setUsersS(response.data.items)
      dispatch(setUserssAC(response.data.items))
      dispatch(setUserssAC(response.data.items))
      dispatch(setFilteredUsersAC(response.data.items))
    }
    getData()
  }
  useEffect(() => {
    onOrderByHandlerRef()
  }, [orderBy, order])

  const filterRef = useRef()
  const onChangeHandlerRef = () => {
    if (!filterBy) return
    setFilterValue(filterRef.current.value)

    const filtered = usersS.filter((u) => {
      const value = u[filterBy].toLowerCase()
      if (value.includes(filterValue.toLowerCase())) return u
    })
    console.log(filteredUsers)
    //setFilteredUsers(filtered)
    dispatch(setFilteredUsersAC(filtered))
  }
  useEffect(() => {
    onChangeHandlerRef()
  }, [filterValue])

  const paginationHandler = async (e, page) => {
    dispatch(setPageNumberAC(page))

    const response = await axios.get(
      `https://kirill.totalavengers.com/api/users/?sort=${orderBy}_${order}&page=${page}`
    )

    //dispatch(setUserssAC(response.data.items))
    setUsersS(response.data.items)

    dispatch(setFilteredUsersAC(response.data.items))
  }

  return (
    <div>
      {/* Filter form starts *************************** */}
      <div>
        <h5 style={{ marginLeft: '30px', marginBottom: 0 }}>Filter by:</h5>
        <div className='filter-form'>
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
              <option value='email'>Email</option>
            </select>

            <input
              type='text'
              className='form-control w-45 m-3'
              id='value'
              placeholder='Value to search'
              name='value'
              value={filterValue}
              ref={filterRef}
              onChange={onChangeHandlerRef}
            />
          </form>
        </div>
      </div>

      {/* Filter form ends **************************** */}

      {/* 88888888888888888888888888888888888888888888888 */}

      <div>
        <h5 style={{ marginLeft: '30px', marginBottom: 0 }}>Order by:</h5>
        <div className='filter-form'>
          <form
            className='form-inline d-flex p-2 align-items-center'
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              ref={orderByRef}
              defaultValue={orderBy}
              onChange={onOrderByHandlerRef}
              className='form-select w-45 m-3'
              aria-label='Default select example'
            >
              <option value='firstname'>Firstname</option>
              <option value='lastname'>Lastname</option>
              <option value='email'>Email</option>
              <option value='address'>Address</option>
            </select>

            <select
              ref={orderRef}
              defaultValue={order}
              onChange={onOrderByHandlerRef}
              className='form-select w-45 m-3'
              aria-label='Default select example'
            >
              <option value='asc'>ASC</option>
              <option value='desc'>DESC</option>
            </select>
          </form>
        </div>
      </div>

      {/* 88888888888888888888888888888888888888888888888 */}

      <UserList
        users={filteredUsers}
        setCount={setCount}
        count={count}
        setUsersS={setUsersS}
      />

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
