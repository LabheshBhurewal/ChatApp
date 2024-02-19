import React from 'react'
import Chat from '../../Components/Chat/Chat'
import Sidebar from '../../Components/Sidebar/Sidebar'



const Home = () => {
  return (
    <div className="home">
        <div className="container">
    <Sidebar/>
    <Chat/>
    
    </div>
    </div>
  )
}

export default Home