import React,{useState,useEffect} from 'react'
import {auth} from './firebase'
import Navbar from './components/Navbar.js'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Lineup from './components/Lineup.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';

function App() {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user) setUser(user)
      else setUser(null)
    })
    return()=>{
      unsubscribe()
    }
  },[])
  return (
    <Router>
      <Navbar user={user}/>
      <Routes>
        <Route exact path="/" element={<Lineup user={user}/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
