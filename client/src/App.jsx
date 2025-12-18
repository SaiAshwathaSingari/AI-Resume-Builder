import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Layout from './pages/Layout';
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from './pages/Preview';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
const App = () => {
  return (<>
  
  
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