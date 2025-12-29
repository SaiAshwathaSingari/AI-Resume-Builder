import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';

const Layout = () => {
  const { user, loading } = useSelector(state => state.auth);
  const token = localStorage.getItem("token");

  if (loading) return null; // or spinner

  if (!user && !token) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
