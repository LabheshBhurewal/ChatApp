import React, { useContext, useEffect, useState } from 'react'
import Message from '../Message/Message'
import { ChatContext } from '../../context/Chatcontext'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../firebase'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)
  console.log(messages);
  useEffect(() => {
    if (data && data.Chatid) {
      const unSub = onSnapshot(doc(db, "chats", data.Chatid), (dc) => {
        if (dc.exists()) {
          setMessages(dc.data().messages);
        }
      });
      return () => {
        unSub();
      };
    }
  }, [data]);

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
