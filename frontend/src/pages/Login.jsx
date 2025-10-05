import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
export default function Login(){
  const [form,setForm]=useState({email:'',password:''});
  const { login } = useContext(AuthContext);
  const onChange = e=> setForm({...form,[e.target.name]: e.target.value});
  const onSubmit = async e=>{
    e.preventDefault();
    try{ const res = await API.post('/auth/login', form); login(res.data.user, res.data.token); window.location='/'; }
    catch(err){ alert(err.response?.data?.message||err.message); }
  };
  return (<form onSubmit={onSubmit} style={{maxWidth:420}}>
    <h2>Login</h2>
    <input name='email' placeholder='Email' value={form.email} onChange={onChange} required/><br/>
    <input name='password' type='password' placeholder='Password' value={form.password} onChange={onChange} required/><br/>
    <button type='submit'>Login</button>
  </form>);
}
