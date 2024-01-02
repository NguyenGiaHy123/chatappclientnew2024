import React, { useContext, useEffect, useState,useRef } from 'react'
import { ChatContext } from '../../Context/ContextChat'
import { IChats, IMessage, User } from '../../Type'
import { GetSenderChat } from '../../AllTaps/ConfigUser/LogicUser'
import {notification,message} from 'antd'
import { AiOutlineTags,AiOutlineArrowLeft } from "react-icons/ai";
import { Form, Input } from 'antd';
import ScrollAbleChat from './ScrollAbleChat';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import axios from 'axios';
import imageTyping from '../../HomePage/image/typing.gif'
import imageTyping1 from '../../HomePage/image/typing2.gif'
import HomePageSwipper from '../../HomePage/RecomemdHomepage'
import { GroupChat } from './GroupChat'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const ChatBox = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const ContextChat = useContext(ChatContext)
    const dataContext: any = ContextChat
    const { state } = dataContext
    const [selectedChat, setSelectedChat] = state.selectedChat
    const [users, setUser] = state.user
    const [socket,setSocket]=state.socket
    const [chats, setChats] = state.chats

    const [loading,setLoading]=useState(false)
    const [isTyPing,setIsTyping]=useState(false)
    const [inputValue, setInputValue] = useState('');
   
 
  
    useEffect(() => {
        const fetchMessage = async () => {
          if (!selectedChat)
            return;
          if(socket){
            socket.emit('setup',users)
          }
          
          try {
            setLoading(true)
            const config = {
              headers: {
                Authorization: `Bearer ${users.tokenUser}`,
                'Content-Type': 'application/json'
              }
            };
            const {data} = await axios.get(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/Messages/getMessageByIdChat?chatId=${selectedChat._id}`, config);
            if(data){
                setLoading(false)
                setMessages(data)
                if(socket){
                    socket.emit('join chat',selectedChat._id)
                    return ()=> socket.off('join chat')
                }
                
            }

          } catch (error) {
            console.log(error);
            notification['error']({
              message: 'Thông báo',
              description: 'Lỗi không thể lấy tin nhắn'
            });
          }
        };
        
        fetchMessage();
      }, [selectedChat]);

      useEffect(()=>{
        if(socket){
            socket.on('typing',(data:boolean)=>{
                setIsTyping(data)
              
            })
            socket.on('stopping',(data:boolean)=>{
                setIsTyping(data)
              
            })
     
           
            return ()=>socket.off()
        }
       
      },[selectedChat])

      

      const handleChangInputChatFocus=()=>{
        if(socket){
            socket.emit('typing',selectedChat._id)
           
        }
      }

      const handleChangInputChatBlur=()=>{
        if(socket){
            if(socket){
                socket.emit('Stoptyping',selectedChat._id)
               
            }
        }
      }

      const handleChange = (event:any) => {
        setInputValue(event.target.value);
      };

      const handleKeyPress =async (event:any) => {
        if (event.key === 'Enter') {
          // Xử lý logic khi người dùng nhấn phím Enter
          try{
            if(inputValue){
         
              const config={
                headers:{
                  Authorization: `Bearer ${users.tokenUser}`,
                  'Content-Type': 'application/json'
                }
              }
              const {data} = await axios.post(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/Messages/sendMessage`,{chatId:selectedChat._id, content:inputValue}, config);
         
              if(data){
                setMessages([...messages,data]);
                if(chats){
                  chats.map((c:IChats,index:number)=>{
                      if(c._id===data.chat._id){
                        const chatSetNew=[...chats]
                        chatSetNew[index].latesMessage=data
                        setChats([...chatSetNew])
                      }
                    })
                  }
                socket.emit("new message",data)
              
                setInputValue('')
              }
  
            }
            else{
              notification['error']({
                message:'thong bao',
                description:'vui long nhap data  '
              })
            }

          }
          catch(err){
            console.log(err)
            notification['error']({
              message:'thong bao',
              description:'loi sendmessage  '
            })
          }
        
       
        }
      };
      useEffect(()=>{
        if(socket){
          socket.on('message recieved',(data:any)=>{
            console.log('tin nhan gui ve')
            console.log(data)
            
 
            if(data){
              const newMessage=[...messages]
              newMessage.push(data)
             setMessages(newMessage)
              if(chats){
              chats.map((c:IChats,index:number)=>{
                  if(c._id===data.chat._id){
                    const chatSetNew=[...chats]
                    chatSetNew[index].latesMessage=data
                    console.log('day la chat tai vi tri index')
                    console.log(chatSetNew[index])
                    setChats([...chatSetNew])
                  }
                })
              }
            }
           })
        }
      })
    const getSelectUserIsChoose = (UserLoged: User, selectedChat: IChats) => {
        const value = GetSenderChat(UserLoged, selectedChat.users)
        return (
            <div className='flex items-center p-1'>
              <p className='presspreveriose' onClick={() => { setSelectedChat(null)}} ><MdKeyboardArrowLeft size={30} className='text-gray-600 cursor-pointer -mr-3' /></p>
          
                {value && <div className='flex gap-3 items-center px-5'>
                    <img src={`${value.pic}`} className='w-12 h-12 rounded-full' />
                    <div>
                        <p className='text-xl font-medium '>{value.name}</p>
                        <AiOutlineTags color='gray' className='mt-1' />
                    </div>

                </div>}
            </div>
        )
    }
    return (
        <div
            className='
            h-full w-full
            min-h-screen'
            >
            <div>
                {selectedChat && !selectedChat.isGroupChat ?
                    <div className="flex flex-col h-screen bg-gray-400  relative">
                        <div className='flex items-center h-16 w-full bg-white shadow-md'>
                            {getSelectUserIsChoose(users, selectedChat)}
                        </div>
                            <div className='flex flex-col justify-end  flex-grow'>
                                {loading?<Spin  indicator={antIcon} style={{ fontSize: '100px' }}   className='text-black text-4xl m-auto justify-center self-center  ' />: 
                                 <ScrollAbleChat messages={messages}/>}


                                {isTyPing?<img src={`${imageTyping}` } className='w-6 h-6 rounded-3xl'/>:""} 
                            <Input
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                            onFocus={()=>{handleChangInputChatFocus()}}
                            placeholder='Nhập @, tin nhắn mới ???'
                            onBlur={()=>{handleChangInputChatBlur()}}
                            value={inputValue}
                            className='rounded-none h-14 w-full placeholder-gray-500'
                          
                            />
                        </div>
                    </div>
                    : selectedChat &&selectedChat.isGroupChat ?
                    <div>
                        <div className="flex items-center p-1">
                        <p className='presspreveriose' ><MdKeyboardArrowLeft  onClick={() => { setSelectedChat(null)}}  size={30} className='text-gray-600 cursor-pointer -mr-3'/></p>
                        <div className="flex-shrink-0 pl-4">
                      
          
                            <div className="flex flex-wrap w-10 justify-center  items-center">
                                {selectedChat.users.length > 0 && selectedChat.users.slice(0, 3).map((value: User, index: number) => <img className="w-5 h-5 rounded-full " src={`${value.pic}`} alt="Avatar 1" />)}
                                <p className='rounded-full text-gray-500  flex items-center justify-center  bg-gray-300 w-5 h-5'>{selectedChat.users.length - 3}</p>
                            </div>
                        </div>
                        <div className=" ml-4">
                            <div className="flex items-center">
                                <h4 className="text-lg font-medium">{selectedChat.chatName}</h4>
                            </div>
                            <AiOutlineTags color='gray' className='mt-1' />
                        </div>
                      
                    </div>
                        <div className='bg-gray-300'>
                              <GroupChat  />
                        </div>
                    </div>
                  :<div className='flex flex-col  min-h-screen item-center justify-center'>
                    <HomePageSwipper/>
                      </div>
                }
            </div>
        </div>
    )
}

export default ChatBox