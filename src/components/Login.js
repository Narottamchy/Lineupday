import React,{useState} from 'react'
import {auth} from '../firebase.js'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
        const result = await auth.signInWithEmailAndPassword(email,password)
            window.M.toast({html:`welcome ${result.user.email}`,classes: 'rounded orange'})
            navigate('/')
        }catch(err){
            window.M.toast({html:err.message,classes: 'rounded orange'})
        }
    }
  return (
    <div className='centre container' style={{maxWidth:"550px"}}>
        <h2 style={{color:'yellow'}}>Login</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="input-field">
          <input style={{color:'white'}} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" />
          <input style={{color:'white'}} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
        </div>
        <button type="submit" className="btn blue">Login</button>
      </form>
    </div>
  )
}
