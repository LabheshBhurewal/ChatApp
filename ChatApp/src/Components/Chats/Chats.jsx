import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Authcontext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

const Chats = () => {
    const [chats,setChats]=useState([])
    const currentUser = useContext(AuthContext)

    useEffect(()=>{
        const getchats =()=>{
        const unsub = onSnapshot(doc(db, "userschat", currentUser.uid), (doc) => {
            setChats(doc(data));
        });

        return ()=>{
           unsub();
        }
        }
        currentUser.uid && getchats()
    },[currentUser.uid]);
    console.log(chats);
  return (
    <div className='Chats'>
         <div className="userChat">
            <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=''/>
            <div className="userChatInfo">
                <span>Tarang</span>
                <p>Hello</p>
            </div>
        </div>
         <div className="userChat">
            <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=''/>
            <div className="userChatInfo">
                <span>Tarang</span>
                <p>Hello</p>
            </div>
        </div>
         <div className="userChat">
            <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=''/>
            <div className="userChatInfo">
                <span>Tarang</span>
                <p>Hello</p>
            </div>
        </div>
         <div className="userChat">
            <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=''/>
            <div className="userChatInfo">
                <span>Tarang</span>
                <p>Hello</p>
            </div>
        </div>
    </div>
  )
}

export default Chats