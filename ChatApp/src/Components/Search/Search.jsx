import { useContext, useState } from 'react'
import { collection, query, where ,getDocs, updateDoc ,serverTimestamp,getDoc,setDoc } from "firebase/firestore";
import {db} from "../../firebase"
import { AuthContext } from '../../context/Authcontext';
 

const Search = () => {
  const[username,setUsername]=useState("")
  const[user,setUser]=useState(null)
  const[err,setErr]=useState(false)

  const currentUser=useContext(AuthContext)
const handleSearch = async()=>{
  const q =query(collection(db,"users"),
  where("displayName", "==", username))
  
  try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data())
   });
  }
  catch(err){
    setErr(true);
  }
};

 const handleKey =(e) => {
   e.code === "Enter" && handleSearch();
 }


 const handleSelect = async () =>{
    //check whether the group chat is exist in firebase database or not 
    const combinedID= currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    //create user chat

    try{
      const res = await getDoc(doc(db,"chats",combinedID))
      if(!res.exists()){
        //create chat in chats collection
        await setDoc(doc,(db,"chats",combinedID),{messages:[]});

        await updateDoc(doc,(db,"userschat",currentUser.uid),{
          [combinedID + ".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedID +".date"]: serverTimestamp()
        })
        await updateDoc(doc,(db,"userchats",currentUser.uid),{
          [combinedID + ".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedID +".date"]: serverTimestamp()
        })
      }
    }
    catch(err){
      setErr(true)
    }
 };

  return (
    <div className='search'>
        <div className="searchForm">
            <input type='text'placeholder="find a user" 
            onKeyDown={handleKey} 
            onChange={(e)=> setUsername(e.target.value)}
            />
        </div>
        {err && <span>User is not found.</span>}
        {user && <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt=''/>
            <div className="userChatInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
</div>
  )
}

export default Search