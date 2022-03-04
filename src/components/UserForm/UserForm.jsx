import './UserForm.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const UserForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState(null)
  const [address, setAddress] = useState('')

  useState(() => {
    if (id) {
      const getUser = async () => {
        const result = await axios.get(
          `https://kirill.totalavengers.com/api/users/${id}`
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      firstname,
      lastname,
      email,
      gender,
      age,
      address,
    }

    if (id) {
      await axios.put(
        `https://kirill.totalavengers.com/api/users/${id}`,
        newUser
      )
      navigate('/')
    } else {
      await axios.post('https://kirill.totalavengers.com/api/users', newUser)
      navigate('/')
    }
  }

  return (
    <div class='form-style-3'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>User</legend>
          <label>
            <span>
              Firstname <span class='required'>*</span>
            </span>
            <input
              type='text'
              class='input-field'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>

          <label>
            <span>
              Lastname <span class='required'>*</span>
            </span>
            <input
              type='text'
              class='input-field'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>

          <label>
            <span>
              Email <span class='required'>*</span>
            </span>
            <input
              type='email'
              class='input-field'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>
              Gender <span class='required'>*</span>
            </span>
            <select class='select-field'>
              <option value='Gender' disabled selected hidden>
                Gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </label>

          <label>
            <span>
              Age <span class='required'>*</span>
            </span>
            <input
              type='number'
              class='input-field'
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </label>

          <label>
            <span>
              Address <span class='required'>*</span>
            </span>
            <input
              type='text'
              class='input-field'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <input type='submit' value={id ? 'save' : 'add'} />
        </fieldset>
      </form>
    </div>
  )
}
