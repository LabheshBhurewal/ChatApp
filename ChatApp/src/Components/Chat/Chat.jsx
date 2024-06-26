import React, { useContext } from 'react'
import Cam from "../../img/cam.png"
import Add from '../../img/add.png'
import More from '../../img/more.png'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import { ChatContext } from '../../context/Chatcontext'


const Chat = () => {
  const  { data } = useContext(ChatContext)
  console.log(data) 
  return (
    <div className='Chat'>
    <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
            <img src={Cam} />  
            <img src={Add} />  
            <img src={More} />  
                 </div>
    </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat