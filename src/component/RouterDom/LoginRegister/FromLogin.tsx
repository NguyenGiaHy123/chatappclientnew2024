
import React from 'react'
import {Tabs} from 'antd'
import './Form.css'
import '../LoginRegister/'
import { PageLogin } from './PageLogin'
import  PageRegister  from './PageRegister'
export const FormLogin=()=>{
    const {TabPane} =Tabs
    return <div className="z-30 p-3 w-96  demo">
    <Tabs className="bg-red-30 flex contextForm">
        
        
   
      <TabPane tab="Đăng nhập với email " key="3" >
        {/* Nội dung của TabPane 1 */}
        <PageLogin/>
      </TabPane>
      
      <TabPane tab="Đăng ký một tài khoảng " key="2" >
        <PageRegister/>
      </TabPane>
    </Tabs>
  </div>
 
}