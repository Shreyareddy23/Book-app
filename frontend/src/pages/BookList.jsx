import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
export default function BookList(){
  const [books,setBooks]=useState([]);
  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);
  useEffect(()=>{ fetch(); },[page]);
  const fetch=async()=>{ try{ const res=await API.get(`/books?page=${page}`); setBooks(res.data.books); setTotalPages(res.data.totalPages); }catch(e){alert(e.message);} };
  return (<div>
    <h2>Books</h2>
    {books.map(b=> (<div key={b._id} style={{border:'1px solid #ccc', padding:8, margin:8}}>
      <h3><Link to={'/book/'+b._id}>{b.title}</Link></h3>
      <div>Author: {b.author} | Avg: {b.averageRating.toFixed(2)} ({b.reviewCount})</div>
    </div>))}
    <div style={{marginTop:12}}>
      <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
      <span style={{margin:8}}>Page {page} / {totalPages}</span>
      <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
    </div>
  </div>);
}
