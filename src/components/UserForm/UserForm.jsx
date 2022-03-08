import './UserForm.css'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

//redux stuff
import { useSelector, useDispatch } from 'react-redux'

export const UserForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isError, setIsError] = useState(false)

  const page = useSelector((state) => state.page.pageNumber)

  console.log(page)

  const [firstname, setFirstname] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [email, setEmail] = useState(null)
  const [gender, setGender] = useState(null)
  const [age, setAge] = useState(null)
  const [address, setAddress] = useState(null)

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
    setIsError(false)

    const newUser = {
      firstname,
      lastname,
      email,
      gender,
      age,
      address,
    }

    if (
      newUser.firstname === null ||
      newUser.lastname === null ||
      newUser.email === null ||
      newUser.gender === null ||
      newUser.age === null ||
      newUser.address === null
    ) {
      setIsError(true)
      return
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
    <div className='form-style-3'>
      <form onSubmit={handleSubmit}>
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
              onChange={(e) => setAge(parseInt(e.target.value))}
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
          <input type='submit' value={id ? 'save' : 'add'} />
          {isError && (
            <span className='warning'>All fields should be filled in</span>
          )}
        </fieldset>
      </form>
    </div>
  )
}
