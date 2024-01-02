
import logo from './logo.svg';
import React, { useState,useContext } from 'react';
import './index.css';



import HomePageSwipper from '../../HomePage/RecomemdHomepage';
import Tabmain  from '../../AllTaps/tabMain/Tabmain';
import ChatBox from '../ChatBox/ChatBox';
import { ChatContext } from '../../Context/ContextChat';


const  TrangChu=()=> {
  const ContextChat=useContext(ChatContext)
  const dataContext:any=ContextChat
  const {state}=dataContext
  const [selectedChat, setSelectedChat]=state.selectedChat
  const [user, setUser] = state.user
 
  return (
    <>
       {user
       &&
  <div className='min-h-screen  min-w-screen allChat '>
   <div className={`tablMainContent   relative bg-white shadow-md w-full h-full border-r ${selectedChat?'hid':'show'} border-gray-200`}>
    <Tabmain/>
   </div>
   <div className={` flex items-center   justify-center  chatContent min-h-screen ${selectedChat?"shows":''} `}>
      {/* < HomePageSwipper/>        */}
      <ChatBox/>
   </div>
</div>}
    </>

  );
}

export default TrangChu;
