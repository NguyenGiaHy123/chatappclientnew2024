import { Messages, User } from "../../Type";

export const GetSenderChat=(UserLoged:User,users:User[])=>{
    return UserLoged._id===users[0]._id?users[1]:users[0]

}
//hàm này có nhiệm vụ kiểm tra tin nhan có cùng một người gửi hay không ,và tin nhắn đó phải khác vs người dùng hiện tại 
//đầu tiên kiểm tra tin nhắn phía sau có khác người dùng hay không tại vì là chat đơn chỉ có 2 người dùng thôi 
//nếu tin nhắn phía sau khác người 
export const isSamMessageUser=(messages:Messages[],m:Messages,i:number,user:User)=>{
    return (
               i<messages.length-1&&
               (messages[i+1].sender._id!=m.sender._id||messages[i+1].sender._id===undefined)&&messages[i].sender._id!==user._id
    )
}
export const isLastMessage = (messages:Messages[], i:number, userId:String) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isMessagesUserMargin=(messages:Messages[],m:Messages,i:number,user:User)=>{

      if(i<messages.length-1&&messages[i+1].sender._id===m.sender._id&&messages[i+1].sender._id!==user._id){
        return 'ml-16'
        
      }
      else if(i<messages.length-1&&messages[i+1].sender._id!=m.sender._id&&messages[i].sender._id!==user._id||(i===messages.length-1&&messages[i].sender._id!==user._id)){
        return 'ml-2'
      }
      else{
        return 'ml-auto pr-5'
      }

}
