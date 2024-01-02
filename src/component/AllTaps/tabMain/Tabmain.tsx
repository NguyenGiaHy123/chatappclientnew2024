import React, { useEffect, useState, useContext } from "react";
import { Radio, Space, Tabs } from "antd";
import "./Tabmain.css";

import { FaToolbox } from "react-icons/fa";
import {
  AiOutlineMessage,
  AiFillContacts,
  AiOutlineCheckSquare,
  AiOutlineCloud,
  AiOutlineSetting,
} from "react-icons/ai";
import { TapMessages } from "../TapMessages";
import { Search } from "../Search";
import { ChatContext } from "../../Context/ContextChat";
import SearchUserAddChat from "../SearchUserAddChat/SearchUserAddChat";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Tabmain = () => {
  const userInfor=JSON.parse(localStorage.getItem('user')||"")
  const { TabPane } = Tabs;
  const ContextChat = useContext(ChatContext)
  const navigate=useNavigate()
  const dataChat: any = ContextChat
  const { state } = dataChat
  const [user, setUser] = state.user
  const [tabCurrent, setTabCurrent] = useState("measages");
  const [handleSearchChange,setHandleSearchChange]=useState<boolean>(false)
  const [search,setSearch]=useState("")
  const [searchValueResult,setsearchValueResult]=useState([])
  const [loading,setLoading]=useState(false)
  const [openlogOut,setOpenLogOut]=useState(false)
  const [opentChatResponse,setOpenchatResponse]=useState<boolean>(false)

  const setSearchValueSearch=async(valueSeach:any)=>{
    setSearch(valueSeach)
   
  }
  const removeToken=()=>{
    localStorage.removeItem("user")
    navigate('/Login')
    
  }

  useEffect( ()=>{
    const  getValueSearchServer=async()=>{
      if(search){
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user.tokenUser}`,
            'Content-Type': 'application/json'
          },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/user/search?keyword=${search}`, config);
        if (data) {
          setsearchValueResult(data.user)
          setLoading(false)
        }
      }
    }
    getValueSearchServer()
  },[search])

  useEffect(() => {
    const listIcon = document.querySelectorAll(".nav_menuall .items_icon");
    listIcon.forEach((element, index) => {
      if (element) {
        element.addEventListener("click", function () {
          listIcon.forEach((element) => {
            element.classList.remove("active");
          });
          element.classList.add("active");
        });
      }
    });
  }, []);
  return (
    <div className="flex h-full w-full z-100  " >
      <div className="w-18  h-full relative " style={{ background: "#0091ff" }}>
        <div className="flex flex-col justify-center nav_menuall  items-center">
          <div className="flex flex-col items-center  gap-5">
            <div className="p-2 pt-5 relative w-full ">
              <img

                className=" rounded-full h-12 w-14 border border-white"

                src={`${user ? user.pic : ""}`}
              />
            </div>

            <div className="cursor-pointer items_icon active" onClick={() => { setTabCurrent("measages") }}>
              <AiOutlineMessage size={30} color="white" />
            </div>
            <div className="cursor-pointer items_icon" onClick={() => { setTabCurrent("contact") }}>
              <AiFillContacts size={30} color="white" />
            </div>
            <div className="cursor-pointer items_icon" onClick={() => { setTabCurrent("check") }}>
              <AiOutlineCheckSquare
                size={30}
                color="white"
                className="cursor-pointer items_icon"
              />
            </div>

          </div>
          <div className="flex flex-col items-center absolute left-0 right-0 bottom-5 gap-5 ">
            <div className="cursor-pointer items_icon" onClick={() => { setTabCurrent("cloud") }}>
              <AiOutlineCloud
                size={30}
                color="white"
                className="cursor-pointer items_icon"
              />
            </div>
            <div className="cursor-pointer items_icon" onClick={() => { setTabCurrent("tool") }}>
              <FaToolbox
                size={30}
                className="cursor-pointer items_icon"
                color="white"
              />
            </div>
            <div className="cursor-pointer relative items_icon">
              <AiOutlineSetting
                className="cursor-pointer items_icon"
                size={30}
                color="white"
              onClick={()=>{setOpenLogOut(openlogOut===false?true:false)}}
              />
              {openlogOut&&(
                <div className="absolute ml-24  -mt-28 z-40 border border-gray-300 rounded py-4 shadow-md p-3 px-5 flex flex-col gap-3 bg-white w-36 ">
                <p className="text-red-500 hover:bg-gray-200 w-full px-2" onClick={()=>{removeToken()}}>Đăng xuất</p>
                <p className="text-gray-500  hover:bg-gray-200 w-full px-2">Thoát </p>
             
              </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col w-full h-full  gap-1 p-5 `} >
        <Search handleSearchChange={handleSearchChange} setSearchValueSearch={setSearchValueSearch} setHandleSearchChange={setHandleSearchChange}/>
        {handleSearchChange?<SearchUserAddChat searchValueResult={searchValueResult} search={search} loading={loading} user={user} />:
        
        <>
        {tabCurrent && tabCurrent === "measages" && (
          <div className=" flex-1 flex-shrink-0 ground-menu" >

            <TapMessages opentChatResponse={opentChatResponse}  setOpenchatResponse={setOpenchatResponse}/>
          </div>

        )}
        
        </>}
        


      </div>
    </div>
  );
};
export default Tabmain