export interface TypeContext{
}
export interface User{
    _id:String,
    name:String,
    password:String,
    pic:String,
    role:boolean,
    sdt:String,
    email:String
    tokenUser:String
}
export interface ILogin{
    email:String,
    password:String

}
export interface IRegister{
    name:String,
    email:String,
    sdt:String,
    password:String 
    picture:String
    


}

export interface IUserListItem{
    value:User,
    handleClickFunction:Function
}
export interface IhandleSearchChange{
    handleSearchChange:boolean,
    setHandleSearchChange:Function,
    setSearchValueSearch:Function
}

export interface IMessage{
    _id:String,
    sender:User,
    content:String,
    chat:IChats[],
    readBy:User[],
    timesTamps:String

}
export interface IChats{
    _id:String,
    chatName:String,
    isGroupChat:String
    users :User[]
    groupAdmin:User
    latesMessage:IMessage
    timesTamps:String


}
export interface Messages{
    sender:User,
    content:String,
    chat:IChats[],
    readBy:User[],
    timesTamps:String

}
export interface ScrollAbleChatProps {
    messages: Messages[];
  }

export interface ITabResponse{
    opentChatResponse:boolean,
    setOpenchatResponse:Function
}