import React from 'react'
import { FormRow,Logo } from '../components'
import { Form,redirect,useNavigation, Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import customFetch from '../utils/customFetch.js'
import { toast } from 'react-toastify'
export const action=async({request})=>{
  const formData=await request.formData();
  const data=Object.fromEntries(formData);
  try{
await customFetch.post("/auth/login", data, {
  headers: { "Content-Type": "application/json" },
});
toast.success('Login successful');
   return redirect('/dashboard'); 
  }catch(e){ 
   console.log(e);
   toast.error(e?.response?.data?.msg);
    return e;}

};
const Login = () => {
  const navigation=useNavigation();
  const isSubmitting=navigation.state==='submitting';
  return (
    <Wrapper>
      <Form  method='post' className='form'>
        <Logo/>
        <h4>Login</h4>
        <FormRow type="email" name='email' labelTxt="email" defaultTxt="john@gmail.com"/>
        <FormRow type="password" name='password' labelTxt="Password" defaultTxt="john@123"/>
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>{
              isSubmitting?'submitting...':'submit'
      }</button>
        <button type="button" className='btn btn-block'>Explore the app</button>
        <p>New to the app?
          <Link to='/register' className='member-btn'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
