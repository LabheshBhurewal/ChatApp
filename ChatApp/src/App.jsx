import React from "react";
import Home from "./Pages/Home/Home";
import "./style.scss";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
// import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/Authcontext";
import { useContext } from "react";
const App = () => {

 const {currentUser}= useContext(AuthContext)
console.log(currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
           <Route index element={<Home/>}/>
           <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
