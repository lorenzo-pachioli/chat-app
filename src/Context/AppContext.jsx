import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const[user, setUser] = useState({})
    const[userList, setUserList] = useState({})
    const[token, setToken] = useState({})
    const[chats, setChats] = useState([])
    const[messages, setMessages] = useState([])
    const[redirect, setRedirect] = useState(false);
    const[loading, setLoading] = useState(false);
    const[logOut, setLogOut] = useState(false);
    const [newChat, setNewChat] = useState(false)

    return (
        <AppContext.Provider
          value={{
              user,
              setUser,
              token,
              setToken,
              chats, 
              setChats, 
              messages, 
              setMessages, 
              userList, 
              setUserList, 
              redirect, 
              setRedirect, 
              loading, 
              setLoading, 
              logOut, 
              setLogOut, 
              newChat, 
              setNewChat
          }}
        >
          {children}
        </AppContext.Provider>
      );
    }