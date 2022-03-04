import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export const AddUserPage = () => {
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState(null)
  const [address, setAddress] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      firstname,
      lastname,
      email,
      gender,
      age,
      address: 'test address',
    }

    await axios.post('https://kirill.totalavengers.com/api/users', newUser)
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='First name'
          type='text'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          placeholder='Last name'
          type='text'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          placeholder='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value='' disabled selected hidden>
            select gender
          </option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>

        <input
          placeholder='age'
          type='number'
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />

        <input
          placeholder='address'
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type='submit'>Add User</button>
      </form>
    </div>
  )
}
