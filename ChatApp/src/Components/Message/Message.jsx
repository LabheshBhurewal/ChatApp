import React, { useContext } from 'react'
import { ChatContext } from '../../context/Chatcontext'

const Message = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{data?.user?.uid}</p>
        <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=""/>
      </div>
    </div>
  )
}

export default Message