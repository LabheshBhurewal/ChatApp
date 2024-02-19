import React from 'react'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import Chats from '../Chats/Chats'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar