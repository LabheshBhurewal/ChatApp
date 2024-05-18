import { useState, useContext } from 'react';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateDoc, setDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ChatContext } from '../../context/Chatcontext';
import { AuthContext } from '../../context/Authcontext';
import Attach from "../../img/attach.png";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log(data);

  const handleSend = async () => {
    if (!data || !data.user || !data.user.uid) {
      console.error("No user data available, unable to send message");
      return;
    }

    const combinedId =
      currentUser.uid > data.user.uid
        ? currentUser.uid + data.user.uid
        : data.user.uid + currentUser.uid;

    try {
      let downloadURL = null;
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Track upload progress if needed
            },
            (error) => {
              console.error('Error uploading image:', error);
              reject(error);
            },
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const newMessage = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        ...(downloadURL && { img: downloadURL })
      };

      const chatDocRef = doc(db, "chats", combinedId);
      await updateDoc(chatDocRef, { messages: arrayUnion(newMessage) });

      const lastMessageUpdate = {
        [combinedId + ".lastMessage"]: { text },
        [combinedId + ".date"]: serverTimestamp(),
      };

      await updateDoc(doc(db, "userschat", currentUser.uid), lastMessageUpdate);
      await updateDoc(doc(db, "userschat", data.user.uid), lastMessageUpdate);

      setText("");
      setImg(null);
      console.log("Message sent successfully");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
        <img src={Attach} alt='' />
        <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={img ? URL.createObjectURL(img) : Attach} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
