import React from 'react'
import Cam from "../../img/cam.png"
import Add from '../../img/add.png'
import More from '../../img/more.png'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'


const Chat = () => {
  return (
    <div className='Chat'>
        
    <div className="chatInfo">
        <span>Labhesh</span>
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