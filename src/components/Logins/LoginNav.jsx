import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import './LoginNav.scss'

export const LoginNav =()=>{
  return(
   
     <Container fluid className="nav-cont">
      <div className="brand-name">
        <Link to='/'>Zomato</Link>
      </div>
      <div className="nav-logs">
        <ul className="mb-0">
          <li><Link to='/signup'>Sign up</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </div>
     </Container>
    
  )
}