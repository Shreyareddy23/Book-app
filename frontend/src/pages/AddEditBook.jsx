import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
export default function AddEditBook(){
  const [form,setForm]=useState({title:'',author:'',description:'',genre:'',year:''});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(()=>{ if (id) load(); },[id]);
  const load=async()=>{ const res=await API.get('/books/'+id); setForm(res.data); };
  const onChange=e=> setForm({...form,[e.target.name]: e.target.value});
  const submit=async e=>{ e.preventDefault(); try{ if (id) await API.put('/books/'+id, form); else await API.post('/books', form); navigate('/'); }catch(e){alert(e.response?.data?.message||e.message);} };
  return (<form onSubmit={submit} style={{maxWidth:600}}>
    <h2>{id?'Edit':'Add'} Book</h2>
    <input name='title' placeholder='Title' value={form.title} onChange={onChange} required/><br/>
    <input name='author' placeholder='Author' value={form.author} onChange={onChange} required/><br/>
    <input name='genre' placeholder='Genre' value={form.genre} onChange={onChange}/><br/>
    <input name='year' placeholder='Year' value={form.year} onChange={onChange}/><br/>
    <textarea name='description' placeholder='Description' value={form.description} onChange={onChange} rows={6}></textarea><br/>
    <button type='submit'>Save</button>
  </form>);
}
