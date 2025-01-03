import { Button, Container, Form } from "react-bootstrap"
import './Logins.scss'
import { LoginNav } from "./LoginNav"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { setToken } from "../../Composable/handleAuth"
import { useState } from "react"
import RotateRightIcon from '@mui/icons-material/RotateRight'

export const Login =()=>{
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
  <main className="form-holder">
    <LoginNav/>
    <div className='text-center alert-box'>
       { successAlert && <span className='alert alert-pop py-2' role='alert'>logged in successfully</span>} 
       { erroMessage && <span className='alert alert-danger py-2' role='alert'>{erroMessage}</span>} 
      </div>
    <Container className="form-cont">
      <Form className="form" onSubmit={handleLogin}>
        <div>
          <h1>Login</h1>
        </div>
        <hr/>
        <div className="">
            <Form.Group>
              <Form.Control
                className="input"
                name="username"
                type="text"
                required
                value={userInfo.username}
                onChange={handleChange}
                placeholder="username"/><br/>
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
            <div  className="text-center pb-3">
            {
            loading ? (<Button variant='success'>
              <RotateRightIcon className='load-spinner'/>
              logging</Button>) : (<button className='btn btn-info px-4'>Login</button>)
          }
            </div>
            <div className="">
              <p>Don&apos;t have account? <Link to='/signup'>Sign up</Link></p>
            </div>

        </div>
      </Form>
    </Container>

  </main>
  )
}