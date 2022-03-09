import './ModalForm.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import {
  closeModalFormAC,
  setEditedUserIdAC,
  setFilteredUsersAC,
} from '../../redux/action-creators'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '50px',
  zIndex: 10,
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 9,
}

export const ModalForm = ({ informUI, setUsersS }) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.editedUser.editedUserId)
  const [userToEdit, setUserToEdit] = useState(null)
  const pageNumber = useSelector((state) => state.page.pageNumber)

  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [email, setEmail] = useState(null)
  const [gender, setGender] = useState(null)
  const [age, setAge] = useState(null)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const result = await axios.get(
          `https://kirill.totalavengers.com/api/users/${userId}`
        )

        setFirstname(result.data.firstname)
        setLastname(result.data.lastname)
        setEmail(result.data.email)
        setGender(result.data.gender)
        setAge(result.data.age)
        setAddress(result.data.address)

        console.log(result.data)
      }
      getUser()
    }
    return
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()

    const editedUser = {
      firstname,
      lastname,
      email,
      gender,
      age,
      address,
    }

    await axios.put(
      `https://kirill.totalavengers.com/api/users/${userId}`,
      editedUser
    )

    const GetUpdatedUsers = async () => {
      const response = await axios.get(
        `https://kirill.totalavengers.com/api/users?page=${pageNumber}`
      )

      //dispatch(setUserssAC(response.data.items))
      setUsersS(response.data.items)
      dispatch(setFilteredUsersAC(response.data.items))
    }

    GetUpdatedUsers()

    dispatch(closeModalFormAC())
    informUI(userId)
  }

  return (
    <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_STYLES}>
        <div className='form-style-3'>
          <form onSubmit={(e) => submitHandler(e)}>
            <fieldset>
              <legend>User</legend>
              <label>
                <span>
                  Firstname <span className='required'>*</span>
                </span>
                <input
                  type='text'
                  className='input-field'
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>

              <label>
                <span>
                  Lastname <span className='required'>*</span>
                </span>
                <input
                  type='text'
                  className='input-field'
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>

              <label>
                <span>
                  Email <span className='required'>*</span>
                </span>
                <input
                  type='email'
                  className='input-field'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label>
                <span>
                  Gender <span className='required'>*</span>
                </span>
                <select
                  className='select-field'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value='Gender' disabled selected hidden>
                    Gender
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </label>

              <label>
                <span>
                  Age <span className='required'>*</span>
                </span>
                <input
                  type='number'
                  className='input-field'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label>
                <span>
                  Address <span className='required'>*</span>
                </span>
                <input
                  type='text'
                  className='input-field'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              <input type='submit' value='save' />
              {/* {isError && (
                <span className='warning'>All fields should be filled in</span>
              )} */}
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}
