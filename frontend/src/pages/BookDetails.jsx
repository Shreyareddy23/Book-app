import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
export default function BookDetails(){
  const { id } = useParams();
  const [book,setBook]=useState(null);
  const { user } = useContext(AuthContext);
  const [rating,setRating]=useState(5);
  const [text,setText]=useState('');
  useEffect(()=>{ fetch(); },[]);
  const fetch=async()=>{ try{ const res=await API.get('/books/'+id); setBook(res.data); }catch(e){alert(e.message);} };
  const submitReview=async()=>{ try{ await API.post('/reviews/'+id, { rating, text }); setText(''); fetch(); }catch(e){alert(e.response?.data?.message||e.message);} };
  const deleteReview=async(rid)=>{ if (!confirm('Delete?')) return; try{ await API.delete('/reviews/'+rid); fetch(); }catch(e){alert(e.message);} };
  if (!book) return <div>Loading...</div>;
  return (<div>
    <h2>{book.title}</h2>
    <div>Author: {book.author} | Avg: {book.averageRating.toFixed(2)} ({book.reviewCount})</div>
    <p>{book.description}</p>
    <h3>Reviews</h3>
    {book.reviews.map(r=> (<div key={r._id} style={{border:'1px solid #eee', padding:8, margin:8}}>
      <div><strong>{r.user?.name}</strong> — {r.rating} stars</div>
      <div>{r.text}</div>
      {user && r.user && user.id===r.user._id && <button onClick={()=>deleteReview(r._id)}>Delete</button>}
    </div>))}
    {user ? (<div style={{marginTop:12}}>
      <h4>Add Review</h4>
      <select value={rating} onChange={e=>setRating(Number(e.target.value))}>{[5,4,3,2,1].map(n=> <option key={n} value={n}>{n}</option>)}</select><br/>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} cols={40}></textarea><br/>
      <button onClick={submitReview}>Post Review</button>
    </div>) : (<div><Link to='/login'>Login</Link> to write a review.</div>)}
  </div>);
}
