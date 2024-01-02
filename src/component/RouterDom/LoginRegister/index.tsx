import React from 'react'
import bgzalo from '../../HomePage/image/bgLoginZalo.png'
import { FormLogin } from './FromLogin'

 const  LoginAndRegister=()=> {
  return (
    <div className='flex items-center justify-center relative w-full min-h-screen bg-red-600'>  
            <img src={bgzalo} className='w-full absolute h-full z-1 left-0 top-0 right-0 '/>

            <FormLogin/>
   </div>
  )
}

export default LoginAndRegister