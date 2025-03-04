import React from 'react'
import Navbar from './component/Navbar/Navbar'
import SideBar from './component/Sidebar/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
 
 const App = () => {
   return (
     <div>
       <Navbar/>
       <hr/>
       <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/> 
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
       </div>
     </div>
   )
 }
 
 export default App