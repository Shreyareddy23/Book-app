import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Navbar = ()=>{
  const { user, logout } = useContext(AuthContext);
  return (<nav style={{padding:12, borderBottom:'1px solid #ddd'}}>
    <Link to='/' style={{marginRight:12}}>Home</Link>
    {user ? (<>
      <Link to='/add' style={{marginRight:12}}>Add Book</Link>
      <span style={{marginRight:12}}>Hello {user.name}</span>
      <button onClick={logout}>Logout</button>
    </>) : (<>
      <Link to='/login' style={{marginRight:12}}>Login</Link>
      <Link to='/signup'>Signup</Link>
    </>)}
  </nav>);
};
export default Navbar;
