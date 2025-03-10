import React from 'react'
import { Form,redirect,useNavigation, Link} from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'
import customFetch from '../utils/customFetch.js'
import { toast } from 'react-toastify'
export const action=async({request})=>{
  const formData=await request.formData();
  const data=Object.fromEntries(formData);
  try{
await customFetch.post("/auth/register", data, {
  headers: { "Content-Type": "application/json" },
});
toast.success('Registration successful');
   return redirect('/login'); 
  }catch(e){ 
   console.log(e);
   toast.error(e?.response?.data?.msg);
    return e;}

};
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

 
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo/>
        <h4>Register</h4>
        <FormRow type="text" name='name' labelTxt="first name" defaultTxt='john'/>
        <FormRow type="text" name='lastName' labelTxt="last name" defaultTxt='doe'/>
        <FormRow type="text" name='location' labelTxt="location" defaultTxt='India'/>
        <FormRow type="email" name='email' labelTxt="email" defaultTxt='john@gmail.com'/>
        <FormRow type="password" name='password' labelTxt="password" defaultTxt='john@123'/>
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting?'submitting...':'submit'}
        </button>
        <p>Already a member?
          <Link to='/login' className='member-btn'>Login</Link>
          {/* Link only used for the pages in project, for any external links like gooogle.com we have to use traditional <a></a> tag */}
        </p>
      </Form>      
    </Wrapper>
  )
}

export default Register
