import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../firebase'
const imageUrl = "https://picsum.photos/id/77/info";

function Navbar({user}) {
  const [img, setImg] = useState();

  const fetchImage = () => {
  fetch(imageUrl).then((response)=>{
      return response.json();
    }).then((data)=>{
      let imag=data.download_url
      setImg(imag)
    })
    
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const navigate=useNavigate()
  return (
    <nav>
        <div className="nav-wrapper blue lighten-6">
          <Link to="/" className="brand-logo center" style={{fontFamily: 'Rubik Moonrocks',fontSize:'45px'}}>LineupDay</Link>
          <ul id="nav-mobile" className='container'>
            {
              user?
              <>
                <Link to='/'><img src={img} className='circle left' style={{height:"60px",width:'60px'}}  alt="icons" /></Link>
                <button className='btn-floating btn-large scale-transition waves-effect waves-light orange lighten-2 right' style={{height:"60px",width:'60px',fontWeight:'bold'}} onClick={()=>{
                  auth.signOut()
                  navigate('/login')
                }}>Logout</button>
              </>
              :
              <>
              <Link to="/login"><button className='btn-floating btn-large waves-effect waves-light yellow darken-2 left' style={{height:"60px",width:'60px',fontWeight:'bold'}} >Login</button></Link>
              <Link to="/signup"><button className='btn-floating btn-large waves-effect waves-light yellow darken-2 right' style={{height:"60px",width:'60px',fontWeight:'bold'}}>SignUp</button></Link></>
            }            
          </ul>
        </div>
      </nav>
  )
}

export default Navbar