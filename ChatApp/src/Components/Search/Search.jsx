import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/Authcontext";
import { ChatContext } from "../../context/Chatcontext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [err, setErr] = useState(false);

  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      setErr(false); // Reset error state on successful search
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // corrected invocation of exists()
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        const currentuserchat = await getDoc(
          doc(db, "userschat", currentUser.uid)
        );
        if (!currentuserchat.exists()) {
          await setDoc(
            doc(db, "userschat", currentUser.uid),
            {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            },
            { merge: true }
          ); // Use merge option to avoid overwriting existing data
        }
        const userchat = await getDoc(doc(db, "userschat", user.uid));
        if (!userchat.exists()) {
          await setDoc(
            doc(db, "userschat", user.uid),
            {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            },
            { merge: true }
          ); // Use merge option to avoid overwriting existing data
        }
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }
    console.log(user);
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => {
            setUsername(e.target.value);
            handleSearch();
          }}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
