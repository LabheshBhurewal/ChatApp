import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <span className='logo'>Labhesh Chat</span>
        <div className="user">
            <img src="https://images.pexels.com/photos/19976822/pexels-photo-19976822/free-photo-of-woman-looking-at-flock-of-birds-in-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=''/>
            <span>John</span>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar