import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './User.css'

export const User = ({ user, count, setCount }) => {
  const navigate = useNavigate()

  const deleteHandler = async (id) => {
    await axios.delete(`https://kirill.totalavengers.com/api/users/${id}`)
    setCount(count - 1)
    //navigate('/')
  }

  const editHandler = (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <li className='user-item'>
      <div className='user-info' onClick={() => editHandler(user.id)}>
        {user.name}
      </div>

      <div className='user-buttons'>
        <button onClick={() => editHandler(user.id)}>Edit</button>
        <button onClick={() => deleteHandler(user.id)}>Delete</button>
      </div>
    </li>
  )
}
