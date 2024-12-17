import { useState } from 'react';
import './register.scss'
import axios from 'axios';
import { setToken } from '../../Composable/handleAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RotateRightIcon from '@mui/icons-material/RotateRight'

export const Login =() =>{
  const [ loading, setLoading ] = useState(false)
  const [ erroMessage, setErrorMessage ] = useState(null)
  const [ successAlert, setSuccessAlert ] = useState(false)
  const [ userInfo, setUserInfo ] = useState({
    password:'',
    username:'',
    
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setUserInfo(prevState =>({...prevState, [name]:value}))
  }

   const handleLogin = async(e)=>{
    e.preventDefault()
    const userCredential ={
      password:userInfo.password,
      username:userInfo.username
    }

    setLoading(true)

    try {

      const response = await axios.post('https://porshtech-delivery.vercel.app/api/login',userCredential)
       
      setSuccessAlert(true)
      setToken(response.data)
      setTimeout(()=>{
        setSuccessAlert(false)
        navigate('/')
      },2000)
      
      
 
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response?.data || "Unknown error had accured try again later!")
      setTimeout(()=>{
        setErrorMessage(null)
      },2000)
    }finally{
      setLoading(false)
     }
   }

  return(
    <main className='auth-form-container'>
    <div className='container form-holder pt-5'>
      <div className='alert-box'>
       { successAlert && <span className='alert alert-pop py-2' role='alert'>logged in successfully</span>} 
       { erroMessage && <span className='alert alert-danger py-2' role='alert'>{erroMessage}</span>} 
      </div>
      <form onSubmit={handleLogin} >
      <div className='text-center pb-2'>
        <h1 className='header'><b>Login </b></h1>
        </div>
      <div className='w-75 mx-auto my-2'>
          <label htmlFor="username"  className="form-label">Username</label>
          <input required type="username" id="username" name="username" value={userInfo.username} onChange={handleChange} autoComplete='off' className="form-control" placeholder='Ngala@001' />
        </div>

        <div className='w-75 mx-auto my-2 col'>
          <label htmlFor="password"  className="form-label">Password</label>
          <input required type="password" id="password" name="password" value={userInfo.password} onChange={handleChange} autoComplete='off' className="form-control" placeholder='Enter password' />
        </div>

        <div className='text-center mt-4'>
          {
            loading ? (<Button variant='success'>
              <RotateRightIcon className='load-spinner'/>
              logging</Button>) : (<button className='btn btn-info px-4'>Login</button>)
          }
        </div>

        <div className='mt-3'>
          <p>Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
        </div>

      </form>
    </div>
    </main>
  )
}