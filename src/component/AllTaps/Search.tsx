import { Input, Modal } from 'antd'
import React, { FunctionComponent ,useState} from 'react'
import { AiOutlineUserAdd,AiOutlineUsergroupAdd,AiOutlineSearch } from "react-icons/ai";
import GroupChat from './GroupChat';
import { IhandleSearchChange } from '../Type';


export  const Search:FunctionComponent<IhandleSearchChange>=({handleSearchChange,setHandleSearchChange,setSearchValueSearch})=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleGetValue=(value:any)=>{
    setHandleSearchChange(true)
    setSearchValueSearch(value)
  }
  const clickCloseSeach=(value:boolean)=>{
    setHandleSearchChange(value)
  }

  return (
    <div className='flex items-center w-full gap-3'>
        
        <Input
      placeholder="Tìm kiếm "
      className='w-full'
      onChange={(e) => {handleGetValue(e.target.value)}}
      
      prefix={<AiOutlineSearch className="site-form-item-icon" />}
    />
    {handleSearchChange?<div className='font-medium text-md cursor-pointer'><p onClick={()=>{clickCloseSeach(false)}}>Đóng</p> </div>:<div className='flex gap-3'>
            <AiOutlineUserAdd className='cursor-pointer' onClick={()=>{setIsModalOpen(true)}}/>
            <AiOutlineUsergroupAdd className='cursor-pointer'/>
            <GroupChat isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
  
        </div>}

        
    </div>
  )
}
