import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./Authcontext";

export const ChatContext = createContext();

export const ChatContextProvider= ({ children })=>{
  const {currentUser}=useContext(AuthContext)
   
   const INITIAL_STATE ={
     Chatid:"null",
     user:{},
   };

   const reducer =(state,action) => {
        switch(action.type){
            case "CHANGE_USER":
            return{
                user:action.payload,
                Chatid:currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
            };
            default:
                return state;
        }
   }
   const [state,dispatch] = useReducer(reducer,INITIAL_STATE);

    return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
    </ChatContext.Provider>
    )
}