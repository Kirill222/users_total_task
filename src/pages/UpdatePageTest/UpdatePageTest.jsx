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
      <UserForm />
    </div>
  )
}
