import React,{FunctionComponent} from 'react'
import {IUserListItem} from '../Type'
import { Avatar } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons';
export const UserListItem:FunctionComponent<IUserListItem>=({value,handleClickFunction})=> {
  return (
   
        <div onClick={()=>(handleClickFunction(value))} className='flex shadow-sm hover:bg-blue-300 p-1 rounded mb-3 cursor-pointer  gap-3 items-center w-full border  border-gray-200 '>
          <Avatar src={<img src={`${value.pic}`} alt="avatar" />} />
          <div>
            <p className='text-md'>{value.name}</p>
            <p className='flex'><b>Email</b>|<p>{value.email}</p></p>
          </div>
        </div>
   
  )
}

export default UserListItem