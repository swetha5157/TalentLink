import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div>
      Register page<br></br>
      <Link to='/login'>go to login </Link>
      {/* Link only used for the pages in project, for any external links like gooogle.com we have to use traditional <a></a> tag */}
      
    </div>
  )
}

export default Register
