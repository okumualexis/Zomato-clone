import 'bootstrap/dist/css/bootstrap.min.css'
import './banner.scss'
import { Card, Container,  Form,  NavDropdown } from 'react-bootstrap'
import orderImg from '../assets/images/card1.avif'
import diningImg from '../assets/images/card2.avif'
import eventImg from '../assets/images/card3.jpeg'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link , useNavigate} from 'react-router-dom';
import { decodedToken, getToken, isTokenValid, logout } from '../Composable/handleAuth';
import propTypes from 'prop-types'
import { useState } from 'react'
import AddAlertIcon from '@mui/icons-material/AddAlert';

const Banner = ({user}) => {
  const [userloggein, setUserlogein] = useState(null)
  const navigate = useNavigate()
  const token = getToken()
  const decoded = token ? decodedToken(token) : null
  const userId = decoded ? decoded.userId : null;
  const logged = user(userId)
  const email = logged ? logged.email : null
  const validToken = isTokenValid()

  console.log(email)
  const logoutUser =()=>{
    logout()
    navigate('/')
  }

   const checkLoginStatus =()=>{
    if(!validToken){
      setUserlogein(true)
      setTimeout(()=>{
        setUserlogein(null)
      },3000)
    }else{
      navigate("/order")
    }
   }

  return (
    <div className='outer-container'>

      {
        !decoded && !validToken ? (
          <Container fluid className='banner'>
      <nav>
        <ul>
          <li><Link >Investors Relation</Link></li>
          <li><Link>Add Restaurant</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign up</Link></li>
        </ul>
        
      </nav>
      <div className='mt-5'>
        {userloggein && (<p className='gap-2 login-alert active' ><AddAlertIcon style={{color:'var(--red-6)'}} /> Login or sign up to continue!</p>)}
      <h1 className='text-center'
               style={{
                fontWeight:'var(--font-weight-5)',
                fontSize:'var(--font-size-8)',
                letterSpacing:'var(--font-letterspacing-3)'
                }}>CuisineCove</h1>
              <h6 className='text-center mb-4'
               style={{
                fontWeight:'var(--font-weight-4)',
                fontSize:'var(--font-size-7)'
               }}>Discore the best foods and drinks in Nairobi</h6>
        <div className='text-center' >
                <h5>Ready? Get started, login or register to experience the best we offer</h5>
        </div>
      </div>
    </Container>
        ):(
          <Container fluid className='banner'>
            <nav>
              <ul>
                <li><Link >Investors Relation</Link></li>
                <li><Link>Add Restaurant</Link></li>
                <li>
                    <NavDropdown  title={<span style={{color:'#fff'}} >{email}</span>}>
                      <NavDropdown.Item onClick={()=>logoutUser()}>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </li>
              </ul>
              
            </nav>
            <div className='mt-5'>
              <h1 className='text-center'
               style={{
                fontWeight:'var(--font-weight-5)',
                fontSize:'var(--font-size-8)',
                letterSpacing:'var(--font-letterspacing-3)'
                }}>CuisineCove</h1>
              <h6 className='text-center mb-4'
               style={{
                fontWeight:'var(--font-weight-4)',
                fontSize:'var(--font-size-7)'
               }}>Discore the best foods and drinks in Nairobi</h6>
         
            </div>
          </Container>
        )
      }

    

     <Container className='mt-4 d-flex gap-4 justify-content-center'>
      <Card onClick={checkLoginStatus} className='card-item' style={{width:'20rem'}}>
          <Card.Img src={orderImg} variant='top' style={{height:'180px'}}/>
          <Card.Body>
            <Card.Title>Order Online</Card.Title>
            <Card.Text>Stay home and order to your doorstep</Card.Text>
          </Card.Body>
      </Card>

      <Card className='card-item' style={{width:'20rem'}}>
        <Card.Img src={diningImg} variant='top' style={{height:'180px'}}/>
        <Card.Body>
          <Card.Title>Dining</Card.Title>
          <Card.Text>View the city&apos;s favourite dining venues </Card.Text>
        </Card.Body>
      </Card>

      <Card className='card-item' style={{width:'25rem'}}>
        <Card.Img src={eventImg} variant='top' style={{height:'180px'}}/>
        <Card.Body>
          <Card.Title>Live Events</Card.Title>
          <Card.Text>Discover kenyan&apos;s best events & concerts</Card.Text>
        </Card.Body>
      </Card>
     </Container>

     <Container className='mt-5 collections'>
      <h2>Collections</h2>
      <div className='d-flex justify-content-between'>
        <p>
          Explore curated lists of top restaurants, cafes, pubs, and bars in Nairobi KE, based on trends
        </p>
        <span className='text-danger'>
            All collections in Nairobi
            <ArrowRightIcon/>
          </span>
      </div>
       <section>
          <div className='card1 item'>
             <p className='mb-0 ms-3'>Top trendeing sports</p>
             <span className='ms-3'>
              42 places
              <ArrowRightIcon/>
             </span>
          </div>

          <div className='card2 item'>
             <p className='mb-0 ms-3'>Best insta-worthy places</p>
             <span className='ms-3'>
              48 places
              <ArrowRightIcon/>
             </span>
          </div>

          <div className='card3 item'>
             <p className='mb-0 ms-3'>Hot chocolate Hevens</p>
             <span className='ms-3'>
              63places
              <ArrowRightIcon/>
             </span>
          </div>

          <div className='card4 item'>
             <p className='mb-0 ms-3'>Strawberry sweet treats</p>
             <span className='ms-3'>
              52 places
              <ArrowRightIcon/>
             </span>
          </div>
       </section>

       <Container className='d-flex align-items-center' style={{marginTop:'40px'}}>
         <div>
           <h1>CuisineCove</h1>
         </div>
         <div className='d-flex gap-4 ms-auto' style={{width:'300px'}}>
           <Form.Select>
            <option>Kenya KE</option>
            <option value='tz'>TZ</option>
            <option value='uganda'>Uganda</option>
           </Form.Select>

           <Form.Select>
            <option>English</option>
            <option value='swahili'>Swahili</option>
            <option value='french'>French</option>
           </Form.Select>
         </div>
       </Container>

       <footer>
        <section className='footer-section'>
        <div>
          <h4>About CuisineCove</h4>
          <ul>
            <li><a href="#">Work with us</a></li>
            <li><a href="#">Who we are</a></li>
            <li><a href="#">Report Fraud</a></li>
            <li><a href="#">Investor relation</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>For Restaurants</h4>
          <ul>
            <li><a href="#">Partner with us</a></li>
            <li><a href="#">Apps for you</a></li>
          </ul>
        </div>
        <div>
          <h4>Learn More</h4>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
        </section>
        <div className='text-center py-4'>
          <small>PorshTech LTD &copy; 2024, All rights reserved</small>
        </div>
       </footer>
     </Container>

    
    </div>
  )
}
export default Banner

Banner.propTypes={
  user: propTypes.func
}