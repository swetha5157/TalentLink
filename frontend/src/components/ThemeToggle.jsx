import React from 'react'
import Wrapper from '../assets/wrappers/ThemeToggle'
import {BsFillSunFill,BsFillMoonFill} from 'react-icons/bs'
import { useDashboardContext } from '../pages/DashboardLayout'
const ThemeToggle = () => {
    const {isDark,toggleDark}=useDashboardContext();
  return (
    <Wrapper onClick={toggleDark}>
      {isDark?<BsFillSunFill className='toggle-icon'/>:<BsFillMoonFill/>}
    </Wrapper>
  )
}

export default ThemeToggle
