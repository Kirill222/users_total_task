import { UserPage } from './pages/UsersPage/UserPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CreatePageTest } from './pages/CreatePageTest/CreatePageTest'
import { UpdatePageTest } from './pages/UpdatePageTest/UpdatePageTest'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <Router>
        <Navbar />
        <Routes basename={process.env.PUBLIC_URL}>
          <Route path='/' element={<UserPage />} />
          <Route path='/create' element={<CreatePageTest />} />
          <Route path='/edit/:id' element={<UpdatePageTest />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
