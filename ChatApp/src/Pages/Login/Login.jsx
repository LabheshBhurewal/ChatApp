import React from 'react'
import Addavatar from '../../img/addAvatar.png'
const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form >
       
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          
          <button >Sign in</button>
        
        </form>
        <p>
          You don't  have an account ?Register
        </p>
      </div>
    </div>
  );
  
}

export default Login