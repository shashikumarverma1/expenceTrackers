import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SearchProvider from './context/searchProvider.tsx'
import UserProvider from './context/userDetails.tsx'
import CartProvider from './context/cart.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <UserProvider>
    <SearchProvider>
      <CartProvider>
      <App />
      </CartProvider>
   
    </SearchProvider>
    </UserProvider>
  </React.StrictMode>,
)
