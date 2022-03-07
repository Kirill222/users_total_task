import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserList = ({ users, count, setCount }) => {
  const navigate = useNavigate()

  const editHandler = (id) => {
    console.log('Edit')
    navigate(`/edit/${id}`)
  }
  const deleteHandler = async (id) => {
    console.log('Delete')
    await axios.delete(`https://kirill.totalavengers.com/api/users/${id}`)
    setCount(count - 1)
  }

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Age</th>
            <th scope='col'>Address</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => {
              return (
                <tr key={u.id}>
                  <td>{u.firstname}</td>
                  <td>{u.lastname}</td>
                  <td>{u.email}</td>
                  <td>{u.gender}</td>
                  <td>{u.age}</td>
                  <td>{u.address}</td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={() => editHandler(u.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => deleteHandler(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
