import React, { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar,SmallSidebar,Navbar,Logo,} from '../components'
import { useState } from 'react'
const DashboardContext=createContext();
const DashboardLayout = () => {
  //temp
  const user={name:'john'}
  const [showSidebar,setShowSidebar]=useState(false);
  const [isDark,setDark]=useState(false);
  const toggleDark=()=>{
    console.log('toggle dark theme');
  }
  const toggleSidebar=()=>{
    setShowSidebar(!showSidebar);
    console.log('toggle sidebar');
  }
  const logoutUser=async()=>{
    console.log('logout user');
  }
  return (
    <DashboardContext.Provider
    value={{
      user,
      showSidebar,
      isDark,
      toggleDark,
      toggleSidebar,
      logoutUser
    }}
    >
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar/>
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className='dashboard-page'>
  <Outlet/>
          </div>
        </div>
      </main>
    
    </Wrapper>
    </DashboardContext.Provider>
  )
}
//exxporting custom hook
export const useDashboardContext=()=>useContext(DashboardContext);
export default DashboardLayout
