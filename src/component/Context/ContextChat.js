import React, { createContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import io from 'socket.io-client'
const ChatContext = createContext(null);


const ChatContextProvider = ({ children }) => {
  const userInfor=JSON.parse(localStorage.getItem('user'))
  const [user,setUser]=useState()
  const [selectedChat, setSelectedChat] = useState();
  const [socket,setSocket]=useState(null)
  const [closeChat,setClostChat]=useState(false)

  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const navigate=useNavigate()
  useEffect(()=>{

    if(userInfor){
      setUser(userInfor)
      navigate('/home')

    }
    else{
      navigate('/login')
    }
  },[])
  useEffect(()=>{
    async function connectSocket(){
      //bene nay minh sex truy cap den server ma dang chay tren localhost:8000
    const SocketIo=io('http://localhost:8000/',{
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Header":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "PUT, POST, DELETE, GET",
    },
    })
    if(SocketIo){
      setSocket(SocketIo);
    }
  
     return ()=>socket.close();
  }
  connectSocket();

  },[])
  const state = {
    user: [user, setUser],
    selectedChat: [selectedChat, setSelectedChat],
    notification: [notification, setNotification],
    chats: [chats, setChats],
    socket:[socket,setSocket],
    closeChat: [closeChat,setClostChat]
    
  };

  return <ChatContext.Provider value={{state}}>{children}</ChatContext.Provider>;
};

export { ChatContext, ChatContextProvider };
