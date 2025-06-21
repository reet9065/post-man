import React from 'react'
import Navbar from '../../component/Navbar';
import { Outlet } from 'react-router-dom';
import Loading from '../../component/Loading';

function AppOutet() {
  return (
    <>
    <Navbar/>
    {/* <Loading/> */}
    <Outlet/>
    </>
  )
}

export default AppOutet