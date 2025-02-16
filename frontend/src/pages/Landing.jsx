import React from 'react'
import styled from "styled-components"
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import {Logo} from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
     <nav>
      <Logo/>
     </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>tracking</span> app</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
             Expedita perspiciatis sit distinctio facilis nostrum numquam 
             deserunt quo aspernatur ratione. Ducimus labore recusandae quas consequuntur eius quod enim ea debitis a?
          </p>
          <Link to="/register" className='btn register-link'>Register</Link>
          <Link to="/login" className='btn'>Login / Demo user</Link>

        </div>
        <img src={main} alt='main' className='img main-img'></img>
      </div>
    </Wrapper>
  )
}

export default Landing
