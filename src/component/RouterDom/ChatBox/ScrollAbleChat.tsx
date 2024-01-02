import React, { FunctionComponent,useContext,useRef,useEffect } from 'react'
import { Messages, ScrollAbleChatProps, User } from '../../Type'
import ScrollableFeed from 'react-scrollable-feed'
import io from 'socket.io-client'
import {isSamMessageUser,isLastMessage, isMessagesUserMargin} from '../../../component/AllTaps/ConfigUser/LogicUser'
import { ChatContext } from '../../Context/ContextChat'
import { format } from 'date-fns';
import './Scroll.css'
const ScrollAbleChat:FunctionComponent<ScrollAbleChatProps> = ({messages}) => {
  const ContextChat = useContext(ChatContext)
  const dataContext: any = ContextChat
  const { state } = dataContext
  const [selectedChat, setSelectedChat] = state.selectedChat
  const [users, setUser] = state.user
  const chatContainerRef = useRef<any>(null);
  useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages]);
  return (
    <div className='content_Scroll' ref={chatContainerRef}>
      {messages &&
        messages.map((m, i) => (
          <div key={i} style={{ display: "flex" }} className="items-center">
            {(isSamMessageUser(messages, m, i, users) || isLastMessage(messages,  i, users._id)) && (
              <div className={`${isMessagesUserMargin(messages, m, i, users)}`}>
                <img
                  src={`${m.sender.pic}`}
                  className="w-12 h-12 rounded-full"
                />
              </div>
            )}
            <span className={`${isMessagesUserMargin(messages, m, i, users)}`}>
              <p className="bg-white mt-1 rounded p-2 mb-1 flex flex-col gap-1">
                {m.content}
                <span className="text-sm text-gray-500">
                  {format(new Date(String(m.timesTamps)), "HH:mm")}
                </span>
              </p>
            </span>
          </div>
        ))}


        
    </div>

  
  
  
  );
};
 
export default ScrollAbleChat