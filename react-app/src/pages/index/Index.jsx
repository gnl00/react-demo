import {NavLink, Outlet} from "react-router-dom";

function Index() {
  return (
    <div>
      <header>
        <h1>This is Index page</h1>
      </header>

      <nav>
        <NavLink to='/home'>Home</NavLink> |
        <NavLink to={'/profile/' + Math.random()}>Profile</NavLink> |
        <NavLink to='/about'>About</NavLink>
      </nav>

      <Outlet />
    </div>
  )
}

export default Index;