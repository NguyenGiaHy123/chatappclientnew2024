import { Checkbox, Tabs } from 'antd'
import React, { useState, useContext, useEffect, FunctionComponent } from 'react'
import { AiOutlineDown, AiFillTag, AiOutlineUserAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import axios from 'axios';
import { ChatContext } from '../Context/ContextChat';
import { IChats, ITabResponse, User } from '../Type';
import { GetSenderChat } from './ConfigUser/LogicUser';
import './TabMess.css'

export const TapMessages:FunctionComponent<ITabResponse> = ({opentChatResponse,setOpenchatResponse}) => {
  
  const { TabPane } = Tabs
  const [stateType, setType] = useState(false)
  const context = useContext(ChatContext)
  const getAllContext: any = context
  const { state } = getAllContext
  const [user, setUser] = state.user
  const [selectedChat, setSelectedChat] = state.selectedChat
  const [loadingScrollChat,setloadingScrollChat]=useState(false)

  const [chats, setChats] = state.chats
  useEffect(() => {
  
      const fetchChat = async () => {
        setloadingScrollChat(true)
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.tokenUser}`
          }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/Chat/getChat`, config)
        if (data) {
          setChats(data.Chat)
        }
      }
      fetchChat()
  
   
  }, [user])
  const itemUserSenderChat = (UserLoged: User, itemChat: IChats) => {
    const value = GetSenderChat(UserLoged, itemChat.users)
    return (
      <div className='flex item-center gap-3 cursor-pointer  hover:bg-gray-100' onClick={() => setSelectedChat(itemChat)}>
        <img src={`${value.pic}`} className='w-12 h-12 rounded-full' />
        <div className='flex-1 flex-shrink-0'>
          <p className='' style={{ fontSize: '1rem', fontWeight: '400' }}>{!itemChat.latesMessage ? <p className='font-medium text-md'>{value.name}</p> : <p>{value.name}</p>}</p>
          {itemChat.latesMessage ? <p className='flex gap-2 items-center'>
            <p className='text-md text-gray-500 flex item-center '>{itemChat.latesMessage.sender&&itemChat.latesMessage.sender.name!==UserLoged.name?itemChat.latesMessage.sender.name:'Bạn'} : </p>
            <p className='text-gray-500'>
              {itemChat.latesMessage.sender&& itemChat.latesMessage.content.length > 50
                ? itemChat.latesMessage.content.substring(0, 51) + "..."
                : itemChat.latesMessage.content}
            </p>
          </p> :
            <div className='flex justify-between  w-full inline-flex'>
              <p className='flex-1' style={{ fontWeight: '450' }}>
             { !itemChat.latesMessage?<p> [Thiệp] Gửi lời chào đến {value.name}</p>:""}  
              </p>
              <p className='ml-auto mr-2 font-bold text rounded-full text-white bg-red-600 flex items-center justify-center w-4 h-4' style={{ fontSize: "12px" }}>N</p>
            </div>}
        </div>
      </div>
    )
  }

  return (
   <>
   {user?<>
    <div className='flex relative '>
      <div className='flex-1 flex-shrink-0 '>
        <Tabs >
          <TabPane tab="Tất Cả" className=' w-full' key="1">
            <div className='flex flex-col gap-5   w-full ' style={{ width: "100%" }}>
              {
                chats && chats.map((item: IChats, index: number) => <div key={index}>
                  {!item.isGroupChat ? (
                    itemUserSenderChat(user, item)
                  ) : <div>
                    <div className="flex items-center pl-1 cursor-pointer  " onClick={() => { setSelectedChat(item)
                   
                    }}>
                      <div className="flex-shrink-0" >
                        <div className="flex flex-wrap w-10 justify-center items-center">
                          {item && item.users.slice(0, 3).map((value, index) => <img key={index} className="w-5 h-5 rounded-full " src={`${value.pic}`} alt="Avatar 1" />)}
                          <p className='rounded-full text-gray-500 flex items-center justify-center bg-gray-300 w-5 h-5'>{item.users.length - 3}</p>

                        </div>
                      </div>
                      <div className="flex-grow ml-4">
                        <div className="flex items-center">
                          <h4 className="text-lg font-medium">{item.chatName}</h4>
                        </div>
                        <p className="text-gray-500">{item.latesMessage?item.latesMessage.content&&item.latesMessage.content.length>30? item.latesMessage.content.substring(0, 51) + "...":item.latesMessage.content:  <div className='flex justify-between  w-full inline-flex'>
              <p className='flex-1' style={{ fontWeight: '450' }}>
             { !item.latesMessage?<p> [Thiệp] Gửi lời chào đế... </p>:""}  
              </p>
              <p className='ml-auto mr-2 font-bold text rounded-full text-white bg-red-600 flex items-center justify-center w-4 h-4' style={{ fontSize: "12px" }}>N</p>
            </div>}</p>
                      </div>
                    </div>
                  </div>}
                </div>)
              }
            </div>
          </TabPane>
          <TabPane tab="Chờ Duyệt" key="2">
          </TabPane>
        </Tabs>
      </div>

      <div className='flex ml-auto right-0 mt-3 absolute items-center gap-4 mb-4'>
        <div className='flex items-center gap-3 relative cursor-pointer'>
          <p className={`text-sm  flex  items-center gap-3 cursor-pointer ${stateType ? "rounded-full transition-all text-blue-600 font-medium px-2 bg-blue-100" : ""}`} onClick={() => { setType(stateType == false ? true : false) }}>Phân loại<span><AiOutlineDown size={14} /></span></p>
          {stateType && (
            <div>
              <div className='absolute top-8 w-56 p-2 flex gap-4 flex-col bg-white shadow-md  left-0  border bg-black  rounded z-10'>
                <p className='text-sm font-medium'>Theo thẻ phân loại </p>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-4'>
                    <Checkbox />
                    <div className='flex gap-3 items-center'>
                      <AiFillTag color='red' /><span className='text-sm'>Học tập </span>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Checkbox />
                    <div className='flex gap-3 items-center'>
                      <AiOutlineUserAdd /><span className='text-sm'>Tin nhắn từ người lạ </span>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
                <p className='p-2 border-t-2  text-center'>Quản lý phân loại thẻ</p>
              </div>

            </div>
          )}

        </div>
        <div className=''>
          <BsThreeDots />
        </div>

      </div>

    </div></>:""}
   </>
   
 
  

  )
}

