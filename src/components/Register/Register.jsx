import { useState } from 'react'
import './register.scss'
import {Link, useNavigate} from 'react-router-dom'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'
import { Button } from 'react-bootstrap';

export function Register(){
  const [ loading, setLoading ] = useState(false)
  const [ erroMessage, setErrorMessage ] = useState(null)
  const [ successAlert, setSuccessAlert ] = useState(null)
  const [ userInfo, setUserInfo ] = useState({
    firstName:'',
    lastName:'',
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  });

  const navigate = useNavigate()

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setUserInfo(prevState =>({...prevState, [name]:value}))
  }
  const handleSubmit =async(e) =>{
   e.preventDefault();
   const userDate = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.password,
    confirmPassword: userInfo.confirmPassword,
    
   }
   setLoading(true)
   try {
     const response = await axios.post('http://localhost:8800/v2/users', userDate)
      
     setSuccessAlert(response.data)
     setLoading(false)

    setUserInfo(prev =>({...prev, firstName:'',lastName:'',email:'',password:'',confirmPassword:'',username:''}))

    setTimeout(()=>{
      setSuccessAlert(null)
      navigate('/login')
    },3000)
    
   } catch (error) {
    console.log(error)
    setErrorMessage(error.response?.data || "Unknown error had occured try again later!")
    setTimeout(()=>{
      setErrorMessage(null)
    },3000)
   }finally{
    setLoading(false)
   }
    
   
  }
  return (
    <main className='auth-form-container'>
    <div className="form-holder">
      <div className='alert-box'>
       { successAlert && <span className='alert alert-pop d-flex align-items-center gap-2 py-2' role='alert'>
        { successAlert}
        <CheckCircleIcon style={{color:'green'}}/>
        </span>} 
       { erroMessage && <span className='alert alert-danger py-2' role='alert'>{ erroMessage}</span>} 
      </div>
      <form onSubmit={handleSubmit} >
        <div className='text-center pb-2'>
        <h1 className='header'><b>Sign up</b></h1>
        </div>
        <div className='row'>
          <div className='col'>
            <label htmlFor="firstName" className="form-label">FirstName</label>
            <input required type="text" id="firstName" name="firstName" value={userInfo.firstName} onChange={handleChange} className="form-control" autoComplete='off' placeholder='Enter first name' />
          </div>

          <div className='col'>
            <label htmlFor="lastName"  className="form-label">LastName</label>
            <input required type="text" id="lastName" name="lastName" value={userInfo.lastName} onChange={handleChange} className="form-control" autoComplete='off' placeholder='Enter last name' />
          </div>
        </div>

        <div className='row'>
        <div className='w-75 my-2 col'>
          <label htmlFor="username"  className="form-label">Username</label>
          <input required type="text" id="username" name="username" value={userInfo.username} onChange={handleChange} className="form-control" autoComplete='off' placeholder='Username' />
        </div>

        <div className='w-75 my-2 col'>
          <label htmlFor="email"  className="form-label">Email</label>
          <input required type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} className="form-control" autoComplete='off' placeholder='Example@gmail.com' />
        </div>
        </div>


        <div className='row'>
        <div className='w-75 my-2 col'>
          <label htmlFor="password"  className="form-label">Password</label>
          <input required type="password" autoComplete='off' id="password" name="password" value={userInfo.password} onChange={handleChange} className="form-control" placeholder='Enter password' />
        </div>

        <div className='w-75 my-2 col'>
          <label htmlFor="confirmPassword"  className="form-label">Confirm password</label>
          <input required type="password" autoComplete='off' id="confirmPassword" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleChange} className="form-control" placeholder='Confirm password' />
        </div>
        </div>

        <div className='text-center mt-4'>
          {
            loading ? (<Button>
              <RotateRightIcon className='load-spinner'/>
             Signing up</Button>) : (<button className='btn btn-info px-4'>Sign up</button>)
          }
        </div>
        <div className='mt-3'>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
    </main>
  )
}