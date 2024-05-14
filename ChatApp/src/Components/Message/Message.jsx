import React, { useContext } from 'react'
import { AuthContext } from '../../context/Authcontext'
import { ChatContext } from '../../context/Chatcontext'

const Message = (message) => {
  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)
  return (
    <div className='message owner'>
      {/* <div className="messageInfo">
        <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>
      </div> */}
    </div>
  )
}

export default Message