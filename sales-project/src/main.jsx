import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/authcontext.jsx'
import './App.css'
createRoot(document.getElementById('root')).render(
   <AuthContextProvider>
      <RouterProvider router={router}/>
   </AuthContextProvider>
)
