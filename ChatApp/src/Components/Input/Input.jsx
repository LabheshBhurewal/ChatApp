import { useState, useContext } from 'react';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ChatContext } from '../../context/Chatcontext';
import { AuthContext } from '../../context/Authcontext';
import Attach from "../../img/attach.png"

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  console.log(data)
  const handleSend = async () => {
    if (!data || !data.Chatid) {
      console.error("No chatId available, unable to send message");
      return;
    }

    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on("state_changed",
          (snapshot) => {
            // Track upload progress if needed
          },
          (error) => {
            console.error('Error uploading image:', error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const message = await updateDoc(doc(db, "chats", data.Chatid), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
              console.log("Image message sent:", message?.text);
            } catch (error) {
              console.error('Error updating document with image message:', error);
            }
          }
        );

      } else {
        const message = await updateDoc(doc(db, "chats", data.Chatid), {
          messages: arrayUnion({
            senderId: currentUser.uid,
            text,
            date: Timestamp.now(),
            id: uuid(),
          }),
        });
        console.log("Text message sent:", message?.text);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    await updateDoc(doc(db,"userschat",currentUser.uid),{
          [data.Chatid + ".lastMessage"]:{
            text,
          },
          [data.Chatid + ".date"]:serverTimestamp()
    })
    await updateDoc(doc(db,"userschat",data.user.uid),{
          [data.Chatid + ".lastMessage"]:{
            text,
          },
          [data.Chatid + ".date"]:serverTimestamp()
    })
        // console.log(lastMessage)
    setText("");
    setImg(null)
  };

  return (
    <div className='input'>
      <input type="text" placeholder='Type something....' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
        <img src={Attach} alt='' />
        <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;