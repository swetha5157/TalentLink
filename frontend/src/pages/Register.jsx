import React from 'react'
import { Form, Link} from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'
const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo/>
        <h4>Register</h4>
        <FormRow type="text" name='name' labelTxt="first name" defaultTxt='john'/>
        <FormRow type="text" name='lastName' labelTxt="last name" defaultTxt='doe'/>
        <FormRow type="text" name='location' labelTxt="location" defaultTxt='India'/>
        <FormRow type="email" name='email' labelTxt="email" defaultTxt='john@gmail.com'/>
        <FormRow type="password" name='password' labelTxt="password" defaultTxt='john@123'/>

        <button type="submit" className='btn btn-block'>Submit</button>
        <p>Already a member?
          <Link to='/login' className='member-btn'>Login</Link>
          {/* Link only used for the pages in project, for any external links like gooogle.com we have to use traditional <a></a> tag */}
        </p>
      </form>      
    </Wrapper>
  )
}

export default Register
