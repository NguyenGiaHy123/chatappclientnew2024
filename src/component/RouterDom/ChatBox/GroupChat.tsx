import { Input, Spin, notification } from 'antd'
import React,{useContext,useEffect,useState} from 'react'
import './GroupChat.css'
import { IChats, IMessage } from '../../Type';
import { ChatContext } from '../../Context/ContextChat';
import { LoadingOutlined } from '@ant-design/icons';
import imageTyping from '../../HomePage/image/typing.gif'
import axios from 'axios';
import ScrollAbleChat from './ScrollAbleChat';
const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

export const GroupChat = () => {
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
    const handleChangInputChatFocus=()=>{
        if(socket){
            socket.emit('typing',selectedChat._id)
        }
      }



      useEffect(()=>{
        const fetchMessage = async () => {
            if (!selectedChat)
              return;
          
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

      },[])

      const handleChangInputChatBlur=()=>{
        if(socket){
            if(socket){
                socket.emit('Stoptyping',selectedChat._id)
            }
        }
      }

      useEffect(()=>{
        if(socket){
            socket.on("typing",()=>{
                setIsTyping(true)
                

            })
            socket.on('stopping',()=>{
                setIsTyping(false)
            })
            socket.on('message recieved',(data:any)=>{
                console.log('tin nhan gui ve')
                console.log(data)
                if(data){
                  const newMessage=[...messages]
                  newMessage.push(data)
                 setMessages(newMessage)
                  if(chats){
                    const chatSetNew=[...chats]
                    chatSetNew.map((c:IChats,index:number)=>{
                      if(c._id===data.chat._id){
                     
                        chatSetNew[index].latesMessage=data
                       
                        setChats([...chatSetNew])
                      }
                    })
                  }
                }
               })
        }

      })

      const handleChange = (event:any) => {
        setInputValue(event.target.value);
      };
      const handleKeyPress= async(event:any)=>{
        if(event.key === 'Enter'){
            const config={
            headers:{
                Authorization: `Bearer ${users.tokenUser}`,
                'Content-Type': 'application/json'
            }
            }
            const {data} = await axios.post(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/Messages/sendMessage`,{chatId:selectedChat._id, content:inputValue}, config);
            setMessages([...messages,data])
            setInputValue('')
            socket.emit("new message",data)
            if(chats){
                const chatNew=[...chats]
                chatNew.map((c:IChats,index:number)=>{
                    if(c._id===data.chat._id)
                    {
                        chatNew[index].latesMessage=data
                        setChats([...chatNew])
                    }
                })
            }
        }
      }

    
  return (
    <div className='contentGroupChat flex flex-grow justify-end  flex-col'>
        {loading&&<Spin indicator={antIcon} style={{ fontSize: '100px' }} className='justify-center m-auto'/>}
        <ScrollAbleChat messages={messages}/>
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
  )
  }