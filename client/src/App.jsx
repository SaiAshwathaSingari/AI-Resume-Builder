import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Layout from './pages/Layout';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import api from './configs/api.js';
import { useDispatch } from 'react-redux';
import {login,setLoading} from './redux/features/authSlice.js'
import {Toaster} from 'sonner'

const App = () => {
    const dispatch = useDispatch();
  const getUserData = async()=>{
    const token = localStorage.getItem('token')
    try {
      if(token){
        const {data} = await api.get('/api/users/data',{
      headers: {Authorization:token}
     }) 

     if(data.user){
      dispatch(login({token,user: data.user}))
     }
      }
     
     dispatch(setLoading(false))
      
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserData();
  },[])
  return (<>

  <Toaster/>
    <Routes>
      
      <Route path="/" element={<Home />} />
      
      <Route path='app' element={<Layout />} >
      <Route index element={<Dashboard />} />
      <Route path='builder/:resumeId' element={<ResumeBuilder />} />
      </Route>

      <Route path='view/:resumeId' element={<Preview />} />
      <Route path='/login' element={<Login />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  </>
    
  )
}

export default App