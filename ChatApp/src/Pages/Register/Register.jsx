import { useState } from "react";
// import "./Register.scss";
import Addavatar from "../../img/addAvatar.png";
import { Link ,useNavigate } from "react-router-dom";

// Firebase
import { auth, storage, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc ,setDoc ,doc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr(false);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (file) {
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error uploading image: ", error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName: name,
              photoURL: url,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: name,
              photoURL: url,
            });
            await setDoc(doc(db, "userschat", user.uid), {});
            navigate("/")
          }
        );
      } else {
        await updateProfile(user, {
          displayName: name,
        });
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: name,
        });
        await setDoc(doc(db, "userschat", user.uid), {});
        navigate("/")
      }
    } catch (error) {
      console.error("Error signing up: ", error);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form>
          <input
            required
            type="text"
            placeholder="display name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="file">
            <img src={Addavatar} alt="Add avatar" />
            <span>Add an avatar</span>
          </label>
          <input
            type="file"
            id="file"
            name="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleSignUp}>Sign up</button>
          {err && <span>Something went Wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
