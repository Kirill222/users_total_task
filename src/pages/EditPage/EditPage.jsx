import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

export const EditPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState(null)
  const [address, setAddress] = useState('')

  useState(() => {
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
  }, [])

  const saveHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      firstname,
      lastname,
      email,
      gender,
      age,
      address: 'test address',
    }

    await axios.put(`https://kirill.totalavengers.com/api/users/${id}`, newUser)
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={saveHandler}>
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

        <button type='submit'>Save</button>
      </form>
    </div>
  )
}
