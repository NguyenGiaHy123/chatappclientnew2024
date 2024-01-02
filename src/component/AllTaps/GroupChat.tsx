import { Button, Form, Input, Modal, } from 'antd'
import React, { FunctionComponent, useEffect, useState, useContext } from 'react'
import { message, notification } from 'antd'
import { Space, Spin } from 'antd';
import axios from 'axios'
import { ChatContext } from '../Context/ContextChat'
import { User } from '../Type';
import { UserListItem } from './UserListItem'
import { LoadingOutlined } from '@ant-design/icons';
import { AiOutlineClose } from "react-icons/ai";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
interface IGroupChat {
  isModalOpen: boolean,
  setIsModalOpen: Function
}
const GroupChat: FunctionComponent<IGroupChat> = ({ isModalOpen, setIsModalOpen }) => {
  const [groupName, setGroupName] = useState()
  const [selectedUsers, setselectedUsers] = useState<User[]>([]);
  const bagTag=["bg-blue-400",'bg-red-400','bg-gray-500','bg-orange-400','bg-yellow-500','bg-amber-500','bg-green-500','bg-teal-600','bg-lime-700']
  const [search, setSearch] = useState("")
  const contextChat = useContext(ChatContext)
  const contextChatAl: any = contextChat
  const { state } = contextChatAl
  const [user, setUser] = state.user
  const [chats,setChats]=state.chats
  const [SearchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [LoadingCrate, setLoadingCrate] = useState(false)
  
   const [form] =Form.useForm()  
  const handleRemoveUser = (userRemove:User) => {
    const userRemoveSelect = [...selectedUsers];
    const index = userRemoveSelect.findIndex((va) => va._id === userRemove._id);
    if (index !== -1) {
      userRemoveSelect.splice(index, 1);
      setselectedUsers(userRemoveSelect);
    }
  };
  
  const handleClickFunction = (users: User) => {
    if (selectedUsers) {
 
      const check=selectedUsers.every(usercheck=>usercheck._id!=users._id)
      if(check){
        setselectedUsers([...selectedUsers,users])
      }
      else
      notification['error']({
        message: 'User exist  ',
        description: 'chọn bạn bè khác ',
      })
    }
  }
 
  useEffect(() => {
    if (search && user) {
      setLoading(true)
      const searchUser = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${user.tokenUser}`,
          },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/user/search?keyword=${search}`, config);
        if (data) {
          console.log(data)
          setSearchResult(data.user)
          setLoading(false)
        }
      }
      searchUser()
    }
  }, [search])
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const CreateGroup= async(value:any)=>{
    try{
     console.log('day la value')
     console.log(value)

    if(value&&selectedUsers.length>2){
      setLoadingCrate(true)
      const newGroup={
        name:value.name,
        users:selectedUsers 
      }
      const config={
        headers:{
          Authorization:`Bearer ${user.tokenUser}`
        }
      }
      const {data}=await axios.post(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/Chat/createChatGroup`,
      newGroup,
      config
      )
      if(data){
        setLoadingCrate(false)
        setChats([data.fullGroupChat,...chats])
        setIsModalOpen(false)
        notification['success']({
          message:'Thông báo',
          description:'Tạo nhóm thành công'
        })
      }
      else{
        setLoadingCrate(false)
        notification['error']({
          message:'Thông báo',
          description:'Tạo nhóm thất bại'
        })
      }
    }
   

    }
    catch(err){
      setLoadingCrate(false)
        notification['error']({
          message:'Thông báo',
          description:'Tạo nhóm thất bại'
        })
    }
  }

  useEffect(() => {
    // Kiểm tra điều kiện khi mảng selectedUsers thay đổi
    if (selectedUsers.length < 2) {
      form.setFields([
        {
          name: 'SearchUser',
          errors: ['Nhóm phải có ít nhất 2 người.'],
        },
      ]);
    } else {
      form.setFields([
        {
          name: 'SearchUser',
          errors: [],
        },
      ]);
    }
  }, [selectedUsers, form]);
  return (
    <Modal title="Basic Modal" onCancel={handleCancel} footer={null} open={isModalOpen}  >
      <Form
      form={form}
      onFinish={CreateGroup}
      
      >
        <Form.Item
          name="name"
          hasFeedback
          rules={[{required:true,message:"không được để trông"}]}
         
        >
          <Input
            placeholder='Chat Group Name'
            className='border border-gray-400'
          />
        </Form.Item>
        <Form.Item
          name="SearchUser"
          hasFeedback
          rules={[  ]}
        >
          <Input
            placeholder='Search User'
            className='border border-gray-400'
            onChange={(value) => { setSearch(value.target.value) }}
          />
        </Form.Item>
  <div className='mb-3 flex flex-wrap gap-3 items-center'>
  {   selectedUsers?.map((value:User,index)=>(
          <p className={`border border-gray-300 flex items-center justify-center gap-2  rounded-xl text-white w-32 text-md ${bagTag[Math.floor(Math.random() * bagTag.length)]}`}>{value.name}
          <span><AiOutlineClose color={"white"} className="cursor-pointer" onClick={()=>handleRemoveUser(value)}/></span>
          </p>
      ))     }
      </div>
  
            {loading === true ? <div className='flex items-center justify-center '>
        <Space size="middle">
          <Spin size="small" />
        </Space>
      </div> : <>
        {
          search && search.length > 0 ? SearchResult.length > 0 ? SearchResult.slice(0, 4).map((value: User, index) => (<div className='flex flex-col gap-5' key={index}>
            {<UserListItem value={value} handleClickFunction={() => handleClickFunction(value)} />}
          </div>)) : "Không có kết quả tìm kiếm" : ""
        }
      </>
      }
               <Form.Item>
          <Button type="primary" className='w-full bg-blue-500 h-10 ' htmlType='submit'>
            {LoadingCrate && <Spin indicator={antIcon} className='text-white mr-3' />}  Submit
          </Button>
        </Form.Item>
       </Form>
    </Modal>
   
  )
}

export default GroupChat