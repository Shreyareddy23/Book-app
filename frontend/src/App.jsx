import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddEditBook from './pages/AddEditBook';
import ProtectedRoute from './components/ProtectedRoute';
export default function App(){
  return (<AuthProvider>
    <BrowserRouter>
      <Navbar />
      <div style={{padding:16}}>
        <Routes>
          <Route path='/' element={<BookList/>} />
          <Route path='/book/:id' element={<BookDetails/>} />
          <Route path='/add' element={<ProtectedRoute><AddEditBook/></ProtectedRoute>} />
          <Route path='/edit/:id' element={<ProtectedRoute><AddEditBook/></ProtectedRoute>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>);
}
