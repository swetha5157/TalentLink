import React from 'react'
import { FormRow,Logo } from '../components'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo/>
        <h4>Login</h4>
        <FormRow type="email" name='email' labelTxt="email" defaultTxt="john@gmail.com"/>
        <FormRow type="password" name='password' labelTxt="Password" defaultTxt="john@123"/>
        <button type="submit" className='btn btn-block'>Submit</button>
        <button type="button" className='btn btn-block'>Explore the app</button>
        <p>New to the app?
          <Link to='/register' className='member-btn'>Register</Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Login
