import React, { useContext } from 'react'
import { ChatContext } from '../../context/Chatcontext'
import { AuthContext } from '../../context/Authcontext'

const Message = ({message}) => {
  const { currentUser } =useContext(AuthContext)
  const { data } = useContext(ChatContext)
  console.log(message.text)
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? 
          currentUser.photoURL : 
          data.user.photoURL
          } />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt=""/>}
      </div>
    </div>

  )
}

export default Message