import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const User = ({ user }) => {
  const navigate = useNavigate()

  const deleteHandler = async (id) => {
    await axios.delete(`https://kirill.totalavengers.com/api/users/${id}`)
    navigate('/')
  }

  const editHandler = (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <li>
      {user.name}
      <button onClick={() => editHandler(user.id)}>Edit</button>
      <button onClick={() => deleteHandler(user.id)}>Delete</button>
    </li>
  )
}
