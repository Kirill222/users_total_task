import { User } from '../../components/User/User'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './UserPage.css'

export const UserPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'https://kirill.totalavengers.com/api/users'
      )
      console.log(response.data.items)
      setUsers(response.data.items)
      return response.data.items
      console.log(response)
    }

    getData()
  }, [users])

  console.log(users)

  return (
    <ul className='user-list'>
      {users.length &&
        users.map((u) => {
          return <User user={u} key={u.id} />
        })}
    </ul>
  )
}
