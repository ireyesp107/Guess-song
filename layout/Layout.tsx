import { Outlet, Link } from "react-router-dom";
import "./Layout.css"

const Layout = () => {

  return (
    <>
  
    <div className="header"></div>
      <nav>
          <li  className="bar"> 
            <Link  to="/">Home </Link >
          </li>
          <li  className="bar">
            <Link to="/Levels">Play</Link>
          </li>
          {/* <li  className="bar">
            <Link to="/Login">Login</Link>
          </li> */}
          
          <li  className="bar"> 
            <Link  to="/About">How To</Link>
          </li>
          
          {/* <li  className="bar"> 
            <Link  to="/Levels">Levels</Link>
          </li> */}
          
      </nav>
    
      

      <Outlet />
      
    </>
  )
};

export default Layout;
