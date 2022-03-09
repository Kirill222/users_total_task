import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { ModalForm } from '../../components/ModalForm/ModalForm'

import { useSelector, useDispatch } from 'react-redux'
import { openModalFormAC, setEditedUserIdAC } from '../../redux/action-creators'

export const UserList = ({ users, count, setCount, setUsersS }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [idOfItemToDelete, setIdOfItemToDelete] = useState(null)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const isModalFormOpen = useSelector(
    (state) => state.modalWindow.isModalFormOpen
  )

  const openModalForm = (userId) => {
    dispatch(openModalFormAC())
    dispatch(setEditedUserIdAC(userId))
    console.log(isModalFormOpen, userId)
  }

  const deleteHandler = async (id) => {
    console.log('Delete')
    await axios.delete(`https://kirill.totalavengers.com/api/users/${id}`)
    setCount(count - 1)
    setIsModalOpen(false)
  }

  const closeModal = () => {
    //e.preventDefault()
    setIsModalOpen(false)
  }

  const onDeleteButtonClick = (id) => {
    setIsModalOpen(true)
    setIdOfItemToDelete(id)
  }

  //LOGIC RELATED TO UI UPDATE AFTER UPDATING USER
  const [changeIndicator, setChangeIndicator] = useState(false)
  const userId = useSelector((state) => state.editedUser.editedUserId)

  const informUI = (id) => {
    if (id) {
      setChangeIndicator(!changeIndicator)
    }
  }
  useEffect(() => {
    informUI(userId)
    console.log(changeIndicator)

    dispatch(setEditedUserIdAC(null))
    console.log(changeIndicator)
  }, [changeIndicator])
  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////

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
                      onClick={() => openModalForm(u.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => onDeleteButtonClick(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <Modal
        open={isModalOpen}
        closeModal={closeModal}
        deleteHandler={() => deleteHandler(idOfItemToDelete)}
      />
      {isModalFormOpen && (
        <ModalForm informUI={informUI} setUsersS={setUsersS} />
      )}
    </div>
  )
}
