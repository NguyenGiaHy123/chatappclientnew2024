import React, { FunctionComponent, useState } from 'react'
import ChatLoading from '../ChatLoading'
import { User } from '../../Type';
import axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {message,notification} from 'antd'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const SearchUserAddChat: FunctionComponent<{ searchValueResult: User[]; loading: boolean, search: String ,user:User}> = ({ searchValueResult, loading, search,user }) => {
  
     const [Loading,setLoading]=useState(false)
    const AddUserChat=async (value:User)=>{
        try{
            setLoading(true)
        
        if(value){
        
            const config={
                headers:{
                  Authorization:`Bearer ${user.tokenUser}`
                }
              }
              const {data}=await axios.post(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/Chat/postChat`,
              {userID:value._id},
              config
              )
              if(data){
                notification['success']({
                    message:"Thông báo"
                    ,
                    description:'Add chat thành công '
                    
                })

                setLoading(false)
              }
              else{
                notification['error']({
                    message:"Thông báo"
                    ,
                    description:'Add chat thất bại '
                    
                })
              }
             
        }
    }
    catch(err){
        notification['error']({
            message:"Thông báo"
            ,
            description:'Add chat thất bại '
            
        })
        console.log(err)
    }

    }
    return (
        <div className='bg-white h-full w-full'>
            <p className='font-medium text-sm mt-2 mb-2'>Tìm gần đây </p>
            {loading ? <ChatLoading /> :
                search.length > 0 ?
                    <div className='flex flex-col gap-5'>
                        {searchValueResult.map((value: User, index) => (<>
                            <div className='flex gap-3 items-center hover:bg-gray-100 p-1 cursor-pointer'>
                                <img src={`${value ? value.pic : ""}`} className='w-12 h-12 rounded-full' />
                                <div className='flex flex-col flex-1 '>
                                    <p>{value.name}</p>
                                    <p className='text-sm'>Số điện thoại :<span className='text-blue-400'>{value.sdt}</span></p>
                                </div>
                                <p className=' rounded-full text-sm  px-2 cursor-pointer border border-blue-300 text-blue-400 py-1 hover:bg-blue-50' onClick={()=>AddUserChat(value)}>  Add friend Chat </p>
                            
                            </div>
                          
                        </>))}
                        {Loading && <Spin indicator={antIcon} className='text-white mr-3' />}
                    </div>
                    
                    
                    :""
            }

        </div>
    )
}

export default SearchUserAddChat