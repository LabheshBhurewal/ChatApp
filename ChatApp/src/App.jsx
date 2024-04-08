import React from "react";
import Home from "./Pages/Home/Home";
import "./style.scss";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
// import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/Authcontext";
import { useContext } from "react";
const App = () => {

 const {currentUser}= useContext(AuthContext)
console.log(currentUser)

const ProtectedRoute =({ children }) => {
     if(!currentUser){
      return <Navigate to="./login"/>
     }

     return children
}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
           <Route 
           index 
           element={
           <ProtectedRoute>
            <Home/>
            </ProtectedRoute>
          }
          />
           <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;