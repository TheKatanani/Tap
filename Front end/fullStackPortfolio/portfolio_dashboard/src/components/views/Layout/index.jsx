import { NavLink, Outlet } from 'react-router-dom'
import { StyleLayout } from './style'
import { signOut } from 'firebase/auth'
import auth from '../../../firebase/auth'

const Layout = () => {

  return (
    <StyleLayout>
      <aside>
        <h3>theKatanani</h3>
        <nav>
          <ul>
            <NavLink to="about">
              <li>About</li>
            </NavLink>
            <NavLink to="info">
              <li>Info</li>
            </NavLink>
            <NavLink to="categories">
              <li>Categories</li>
            </NavLink>
            <NavLink to="project">
              <li>Project</li>
            </NavLink>
            <NavLink to="resume">
              <li>Resume</li>
            </NavLink>
            <NavLink to="resumeFile">
              <li>Resume File</li>
            </NavLink>
          </ul>
          <button
            onClick={()=>{
              signOut(auth)
                .then(()=>console.log('the user logging out'))
                .catch((error)=>console.log(error.message))
            }}>Sign out</button>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </StyleLayout>
  )
}

export default Layout