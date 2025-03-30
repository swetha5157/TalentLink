import React from 'react'
import { FormRow,Logo, SubmitBtn } from '../components'
import { Form,redirect, Link, useNavigate } from 'react-router-dom'
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
  const navigate=useNavigate();
  const loginDemoUser=async()=>{
    const data={
      email:'test@test.com',
      password:'secret123',
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form  method='post' className='form'>
        <Logo/>
        <h4>Login</h4>
        <FormRow type="email" name='email' labelTxt="email" defaultTxt="john@gmail.com"/>
        <FormRow type="password" name='password' labelTxt="Password" defaultTxt="john@123"/>
       <SubmitBtn/>
        <button type="button" className='btn btn-block' onClick={loginDemoUser}>Explore the app</button>
        <p>New to the app?
          <Link to='/register' className='member-btn'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
