
import logo from './logo.svg';
import React, { useState ,Suspense} from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'


import NotFound from './component/RouterDom/NotFound';
import AllPage from '../src/component/RouterDom/Page'
import Loading from './Looading';
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";


function App() {
  const ShowAllPage=(AllPage:any)=>{
    if(AllPage.length>0){
      return AllPage.map((item:any,index:number)=>{
        return <Route
         key={index} 
        path={item.path}
         element={<Suspense fallback={<Loading/> }>
            {item.main}
         </Suspense>}/>
      })
    }

  }
  return (
      <div className='app' >
        <Routes>
          {ShowAllPage(AllPage)}
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      
      </div>
  );
}

export default App;
