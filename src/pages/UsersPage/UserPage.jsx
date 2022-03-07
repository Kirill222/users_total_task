import { User } from '../../components/User/User'
import { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import axios from 'axios'
import './UserPage.css'

import { UserList } from '../../components/UserList/UserList'

export const UserPage = () => {
  const [users, setUsers] = useState([])
  const [pages, setPages] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'https://kirill.totalavengers.com/api/users'
      )
      console.log(response.data.items)
      setUsers(response.data.items)
      setPages(response.data.pages)
      setCount(response.data.count)
      return response.data.items
    }

    getData()
  }, [count])

  useEffect(() => {
    console.log(count)
  }, [count])

  console.log(users)

  const paginationHandler = async (e, page) => {
    window.scrollTo(0, 0)

    const response = await axios.get(
      `https://kirill.totalavengers.com/api/users?page=${page}`
    )

    setUsers(response.data.items)
  }

  return (
    <div>
      <UserList users={users} setCount={setCount} count={count} />

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
