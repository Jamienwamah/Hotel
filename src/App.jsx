import { useState } from 'react'

import './App.css'
import Layout from './layouts/Layout'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// PAGES
import Register from './pages/Register'
import Login from './pages/Login'
import AddHotel from './pages/AddHotel'
import EditHotel from './pages/EditHotel'
import MyHotels from './pages/MyHotels'
import MainPage from './pages/MainPage'
import Details from './pages/Details'
import Info from './pages/Info'



function App() {


  return (
    <Router>
      <Routes>
       <Route path="/" element={<Layout><MainPage/></Layout>}/>
       <Route path="*"  element={<Navigate to = "/" />}/>
       <Route path= "/users/register" element = {<Layout><Register/></Layout>}/>
       <Route path="/add-hotel" element= {<Layout><AddHotel/></Layout>}/>
      <Route path= "/my-hotels" element = {<Layout><MyHotels/></Layout>}/>
       <Route path= "/auth/login" element = {<Layout><Login/></Layout>}/>
      <Route path = "/my-hotels/edit/:id" element = {<Layout><EditHotel/></Layout>}></Route>
      <Route path = "/view/" element = {<Layout><Details/></Layout>} />
      <Route path = "info/" element = {<Layout><Info/></Layout>}/>
      </Routes>
    </Router>
  )
}

export default App
