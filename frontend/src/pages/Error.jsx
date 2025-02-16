import React from 'react'
import {Link,useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg'
const Error = () => {
  const error=useRouteError();
  console.log(error);
  if(error.status==404){
return (
  <Wrapper>
    <div>
      <img src={img} alt="404" className='notfnd'/>
      <h3>Ohh! page not found</h3>
      <Link to="/dashboard">back to home</Link>
    </div>
  </Wrapper>
)
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
        </div>
    </Wrapper>
  )
}

export default Error
