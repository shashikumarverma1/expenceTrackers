
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Signup from './screen/signup'
import { PageNotFound } from './screen/pageNotFound'
import Login from './screen/login'
import Dashboard from './screen/dashboard'
import NavBar from './components/navbar'
import { useContext, useEffect } from 'react'
import { UserInfo } from './context/userDetails'

function App() {
  const {token, setToken } = useContext(UserInfo)
  return (
    <>
    
     <BrowserRouter >
  
   <Routes>
        {/* <Route  path='/' element={<Signup/>}/> */}
   <Route  path='/' element={<Dashboard/>}/>
     {/* { token ? <Route  path='/' element={<Login/>}/> :
      <Route  path='/' element={<Dashboard/>}/>} */}
      {/* <Route  path='/Signup' element={<Signup/>}/> */}
      <Route  path='/*' element={<PageNotFound/>}/>
      
   </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
