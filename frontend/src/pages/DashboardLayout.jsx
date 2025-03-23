import React, { createContext, useContext } from 'react'
import { Outlet,redirect,useLoaderData,useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar,SmallSidebar,Navbar,Logo,} from '../components'
import { useState } from 'react'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loader = async () => {
  //to verify the user
  try {
    const { data } = await customFetch.get("/users/current-user");
    console.log("Loader executed. User data:", data); // Debugging
    return data;
  } catch (e) {
    console.error("Error fetching user:", e);
    return redirect('localhost:5173');
  }
};
const DashboardContext=createContext();
const DashboardLayout = () => {
  const userData=useLoaderData();
 const user = userData.user || userData;
 console.log(user);

 const navigate=useNavigate();
  const [showSidebar,setShowSidebar]=useState(false);
  const [isDark,setDark]=useState(checkDefaultTheme());
  const toggleDark=()=>{
    const newDarkTheme=!isDark;
    setDark(newDarkTheme);
    console.log('toggle dark theme');
    document.body.classList.toggle('dark-theme',newDarkTheme)
    localStorage.setItem('darkTheme',newDarkTheme);
  }
  const toggleSidebar=()=>{
    setShowSidebar(!showSidebar);
    console.log('toggle sidebar');
  }
  const logoutUser=async()=>{
   navigate('/');
   await customFetch.get('/auth/logout');
   toast.success("Successfully Logged out")
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
            <Outlet context={{user}}/>
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
