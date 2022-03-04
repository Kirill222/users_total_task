import { UserPage } from './pages/UsersPage/UserPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CreatePageTest } from './pages/CreatePageTest/CreatePageTest'
import { UpdatePageTest } from './pages/UpdatePageTest/UpdatePageTest'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/create' element={<CreatePageTest />} />
        <Route path='/edit/:id' element={<UpdatePageTest />} />
      </Routes>
    </Router>
  )
}

export default App
