
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Signup from './screen/signup'
import { PageNotFound } from './screen/pageNotFound'
import Login from './screen/login'
import Dashboard from './screen/dashboard'
import NavBar from './components/navbar'
import { useContext, useEffect, useState } from 'react'
import { UserInfo } from './context/userDetails'

function App() {
  const [token , setToken]=useState('')
  
  const fetchToken = () => {
    const storedToken = localStorage.getItem('token');  
  setToken(storedToken);
  }
  useEffect(()=>{
    fetchToken()
  },[])
  console.log(token , "token")
  return (
    <>
    
     <BrowserRouter >
  
   <Routes>
       
        {
          token ? <Route  path='/' element={<Dashboard/>}/> :
          <Route  path='/' element={<Login/>}/>
        }
 
      <Route  path='/Signup' element={<Signup/>}/>
      <Route  path='/*' element={<PageNotFound/>}/>
      
   </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
