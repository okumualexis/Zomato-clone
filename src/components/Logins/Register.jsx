import { Button, Container, Form } from "react-bootstrap"
import './Logins.scss'
import { LoginNav } from "./LoginNav"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios"

export const Register =()=>{
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
     const response = await axios.post('https://porshtech-delivery.vercel.app/api/users', userDate)
      
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

  return(
  <main className="form-holder">
    <LoginNav/>
    <div className='text-center alert-box'>
       { successAlert && <span className='alert alert-pop d-flex align-items-center gap-2 py-2' role='alert'>
        { successAlert}
        <CheckCircleIcon style={{color:'green'}}/>
        </span>} 
       { erroMessage && <span className='alert alert-danger py-2' role='alert'>{ erroMessage}</span>} 
      </div>
    <Container className="form-cont">
      <Form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Sign Up</h1>
        </div>
        <hr/>
        <div className="">
            <Form.Group>
              <Form.Control
                className="input"
                name="firstName"
                required
                type="text"
                value={userInfo.firstName}
                onChange={handleChange}
                placeholder="First Name"/><br/>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="input"
                name="lastName"
                type="text"
                required
                value={userInfo.lastName}
                onChange={handleChange}
                placeholder="Last Name"/><br/>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="input"
                name="email"
                type="email"
                required
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Email address"/><br/>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="input"
                name="username"
                type="text"
                required
                value={userInfo.username}
                onChange={handleChange}
                placeholder="Username"/><br/>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="input"
                name="password"
                type="password"
                required
                value={userInfo.password} 
                onChange={handleChange}
                placeholder="Password"/><br/>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className="input"
                name="confirmPassword"
                type="password"
                required
                value={userInfo.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"/><br/>
            </Form.Group>
          
            <div  className="text-center pb-3">
            {
            loading ? (<Button>
              <RotateRightIcon className='load-spinner'/>
             Signing up</Button>) : (<button className='btn btn-info px-4'>Sign up</button>)
          }
            </div>
            <div className="">
              <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>

        </div>
      </Form>
    </Container>

  </main>
  )
}