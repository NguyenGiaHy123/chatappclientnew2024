import React,{FunctionComponent, useContext, useState} from 'react'
import { Form, Input, Button } from 'antd'
import { AiOutlineUser, AiFillEyeInvisible, AiOutlineEye, AiOutlineMail } from "react-icons/ai";
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { message, notification } from "antd";
import {useNavigate} from 'react-router-dom'


import { Spin } from 'antd';
import { ILogin } from '../../Type';
import { ChatContext } from '../../Context/ContextChat';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const PageLogin = () => {

  const [Loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const context = useContext(ChatContext)
  const getAllContext: any = context
  const { state } = getAllContext
  const [user, setUser] = state.user
  const onFinishs= async (values:ILogin) => {

    try {
      setLoading(true)
    const {data}=await axios.post(`${process.env.REACT_APP_PORT}/apiNguyenGiaHy/user/login`,
    values,
    {
       headers: {
              'Content-Type': 'application/json'
          },
      }
    )
      if(data){

        notification['success']({
          message: 'Thông báo ',
          description: 'Dang nhap thành công ',
      })
      localStorage.setItem('user',JSON.stringify(data))
      setLoading(false)
      if(JSON.parse(localStorage.getItem('user')||'')){
        setUser(JSON.parse(localStorage.getItem('user')||''))
         navigate('/home')
      }
      }
    
    } catch (e) {
      setLoading(false)
      notification['error']({
        message: 'Thông báo ',
        description: 'login fail ',
    })
      console.log(e)
    }        
  };

  
  return (
    <div className=''>
      <Form onFinish={onFinishs} >
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
          name="password"
          hasFeedback
          rules={[{
            required: true, message: 'không được để trống  '
          },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="input password"
            iconRender={(visible) => (visible ? <AiFillEyeInvisible /> : <AiOutlineEye />)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className='w-full bg-blue-500 h-10 ' htmlType='submit'>
          {Loading && <Spin indicator={antIcon} className='text-white mr-3' />}   Login
          </Button>
          <Button type="primary" className='w-full mt-4 mb-2 border-r border-gray-200' ghost>
            Gửi yêu cầu để đăng nhập
          </Button>
          <p className='text-center text-gray-500'>Quên mật khẩu </p>
        </Form.Item>
      </Form>
    </div>
  )
}

