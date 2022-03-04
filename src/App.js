import { UserPage } from './pages/UsersPage/UserPage'
import { AddUserPage } from './pages/AddUserPage/AddUserPage'
import { EditPage } from './pages/EditPage/EditPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import axios from 'axios'
import { UserForm } from './components/UserForm/UserForm'
import { CreatePageTest } from './pages/CreatePageTest/CreatePageTest'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/create' element={<AddUserPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
        <Route path='/test' element={<UserForm />} />
        <Route path='/testcreate' element={<CreatePageTest />} />
      </Routes>
    </Router>
  )
}

export default App
