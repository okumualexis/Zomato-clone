import { Routes, Route } from 'react-router-dom'
import Banner from './components/Banner'
import {Login} from './components/Register/Login'
import {Register} from './components/Register/Register'
import OrderDashboard from './components/Order/OrderDashboard'
import Admindashboard from './components/Admin/Admindashboard'
import CheckOut from './components/Order/CheckOut'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [users, setUsers ] = useState([])
useEffect(()=>{
  const getUsers = async()=>{
    try {
      const response = await axios.get('http://localhost:8800/v2/users')
      setUsers(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  getUsers()

},[])

const loggedUser = (userId) =>{
  const logged = users.find(user => user._id === userId)
  return logged;
}
  

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Banner user={loggedUser}/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Register/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route path='/order' element={<OrderDashboard/>} />
          <Route path='/checkout' element={<CheckOut/>} />
          <Route path='/admin/*' element={<Admindashboard/>} /> 
        </Route>
      </Routes>
      
    </>
  )
}

export default App
