import './Navbar.css'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <div className='navigation'>
        <NavLink to='/' className='nav-item'>
          Home
        </NavLink>
        <NavLink to='/create' className='nav-item'>
          Create
        </NavLink>
      </div>
    </nav>
  )
}
