import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlinePhone, AiFillEyeInvisible, AiOutlineEye, AiOutlineMail } from "react-icons/ai";
import  axios from 'axios';
import { message, notification } from "antd";
import {useNavigate} from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { IRegister } from '../../Type';
import { ChatContext } from '../../Context/ContextChat';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const PageRegister = () => {
  const [pic, setPic] = useState("")
  const [Loading, setLoading] = useState(false)
  const [eimga, setEimage] = useState()
  const navigate=useNavigate()

  const [DateForm,setDateForm]=useState()
  const context = useContext(ChatContext)
  const getAllContext: any = context
  const { state } = getAllContext
  const [user, setUser] = state.user

  const onFinishs = async (values: any) => {
    try{
    if (eimga && values) {
      setLoading(true)

      const data = new FormData()
      data.append('file', eimga)
      data.append("upload_preset", "chat-app")
      data.append('cloud_name', 'uploadimgagenodejswebgiay')
      fetch('https://api.cloudinary.com/v1_1/uploadimgagenodejswebgiay/image/upload', {
        method: 'post',
        body: data
      }).then((res) => res.json())
        .then(data => {
      
          if(!data){
            setLoading(false)
            notification['error']({
              message: 'Thông báo ',
              description: 'upload image that bai   ',
          })
          }
          else
          setPic(data.url.toString())
          setDateForm(values)
        })
    }
  }catch(e){
    setLoading(false)
    console.log(e)
  }
  };



  const onFinish = async (pic:any,values: IRegister) => {
    if (pic&&values) {

      const newRegister = {
        name: values.name,
        email: values.email,
        sdt: values.sdt,
        password: values.password,
        picture: pic
      }
    
      try{
        const {data} = await axios.post(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/user/userRegister`,
          newRegister
        ,{
                  headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      if(data){
        setLoading(false)
        notification['success']({
          message: 'Thông báo ',
          description: 'Đăng ký thành công ',
      })
      localStorage.setItem('user',JSON.stringify(data))
    
      if(JSON.parse(localStorage.getItem('user')||'')){
        setUser(JSON.parse(localStorage.getItem('user')||''))
         navigate('/home')
      }
      navigate('/home')
      }
      else{
        setLoading(false)
        notification['error']({
          message: 'Thông báo ',
          description: 'Đăng ký thất bại ',
      })
      }
    
      }
      catch(e){
        setLoading(false)
        console.log(e)
      }
    }
  }


  useEffect(()=>{
    if(pic&&DateForm){
      onFinish(pic,DateForm)
    }
  },[pic,DateForm])

  const normFile = (e: any) => {
    if (e) {
      setEimage(e)
    }
  
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };


  return (
    <div className=''>
      <Form onFinish={onFinishs} >
        <Form.Item
          name="name"

          hasFeedback
          rules={[{
            required: true, message: 'không được để trống '
          },

          ]}
        >
          <Input size="large" placeholder="Nhập username  " prefix={<AiOutlineUser color={"gray"} />} />
        </Form.Item>
        <Form.Item
          name="email"
          hasFeedback
          rules={[{
            required: true, message: 'không được để trống '
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('Vui lòng nhập đúng định dạng email');
            },
          })
          ]}
        >
          <Input size="large" placeholder="Nhập email " prefix={<AiOutlineMail color={"gray"} />} />
        </Form.Item>
        <Form.Item
          name="sdt"
          hasFeedback
          rules={[{
            required: true, message: 'không được để trống  '
          },

          ]}
        >
          <Input size="large" placeholder="Nhập sdt  " prefix={<AiOutlinePhone color={"gray"} />} />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please enter a password.',
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter password"
            iconRender={(visible) => (visible ? <AiFillEyeInvisible /> : <AiOutlineEye />)}
          />
        </Form.Item>

        <Form.Item
          name="password_confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please re-enter the password.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match.'));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Re-enter password"
            iconRender={(visible) => (visible ? <AiFillEyeInvisible /> : <AiOutlineEye />)}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image"


          rules={[
            {
              required: true,
              message: 'Please upload an image.',
            },
          ]}
        >
          <Input type='file' accept='image/*' onChange={(e) => normFile(e.target.files && e.target.files[0])} />

        </Form.Item>
        <Form.Item>
          <Button type="primary" className='w-full bg-blue-500 h-10 ' htmlType='submit'>
            {Loading && <Spin indicator={antIcon} className='text-white mr-3' />}  Submit
          </Button>
        </Form.Item>

      </Form>


    </div>
  )
}

export default PageRegister