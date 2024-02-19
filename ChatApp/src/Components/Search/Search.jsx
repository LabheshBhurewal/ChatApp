import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className="searchForm">
            <input type='text'placeholder="find a user"/>
        </div>
        <div className="userChat">
            <img src="https://images.pexels.com/photos/2829373/pexels-photo-2829373.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt=''/>
            <div className="userChatInfo">
                <span>Tarang</span>
            </div>
        </div>
</div>
  )
}

export default Search