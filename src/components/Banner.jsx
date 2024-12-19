import './banner.scss'
import { Card, Col, Container,  Form,  NavDropdown, Row } from 'react-bootstrap'
import orderImg from '../assets/images/card1.avif'
import diningImg from '../assets/images/card2.avif'
import eventImg from '../assets/images/card3.jpeg'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link , useNavigate} from 'react-router-dom';
import { decodedToken, getToken, isTokenValid, logout } from '../Composable/handleAuth';
import propTypes from 'prop-types'
import { useState } from 'react'
import AddAlertIcon from '@mui/icons-material/AddAlert';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Banner = ({user}) => {
  const [userloggein, setUserlogein] = useState(null)
  const [openNav, setOpenNav ] = useState(false)
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
    <Container className='p-0' fluid style={{overflow:'hidden'}}>

      {
        !decoded && !validToken ? (
     <Container fluid className='banner p-0'>
      <nav>
        <ul id='navLinks' className={openNav ? '#navLinks active' : '#navLinks'}>
          <li><Link >Investors Relation</Link></li>
          <li><Link>Add Restaurant</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign up</Link></li>
        </ul>
        <div className='menu-bar' onClick={()=> setOpenNav(prev => !prev)} >
         { 
             openNav ? <CloseIcon style={{fontSize:'var(--font-size-6)'}}/> :
                       <MenuIcon style={{fontSize:'var(--font-size-6)'}}/>   
         } 
        </div>
      </nav>
      <div>
        {userloggein && (<p className='gap-2 login-alert active' ><AddAlertIcon style={{color:'var(--red-6)'}} /> Login or sign up to continue!</p>)}
       <h1 className='text-center hero-title'>CuisineCove</h1>
       <h5 className='text-center hero-text'>Discore the best foods and drinks in Nairobi</h5>
       <h6 className='text-center hero-desc'>Ready? Get started<br/> login or register to experience the best we offer</h6> 
      </div>
    </Container>
        ):(
          <Container fluid className='banner'>
            <nav>
              <ul id='navLinks' className={openNav ? '#navLinks active' : '#navLinks'}>
                <li><Link>Investors Relation</Link></li>
                <li><Link>Add Restaurant</Link></li>
                <li>
                    <NavDropdown  title={<span className='email-display'>{email}</span>}>
                      <NavDropdown.Item onClick={()=>logoutUser()}>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </li>
              </ul>
              <div className='menu-bar' onClick={()=> setOpenNav(prev => !prev)} >
                { 
                   openNav ? <CloseIcon style={{fontSize:'var(--font-size-6)'}}/> :
                             <MenuIcon style={{fontSize:'var(--font-size-6)'}}/>   
                } 
              </div>
            </nav>
            <div>
            <h1 className='text-center hero-title'>CuisineCove</h1>
            <h5 className='text-center hero-text'>Discore the best foods and drinks in Nairobi</h5>
            </div>
          </Container>
        )
      }

    

     <Container className='mt-4  ps-0'>
     
      <Row className='gap-5 mx-auto justify-content-center'>
        <Col md={3}   className='p-0'>
          <Card onClick={checkLoginStatus} className='card-item mx-auto'>
            <Card.Img src={orderImg} style={{height:'200px'}}/>
            <Card.Body>
              <Card.Title>Order Online</Card.Title>
              <Card.Text>Stay home and order to your doorstep</Card.Text>
            </Card.Body>
         </Card>
        </Col>

        <Col md={3}   className='p-0'>
          <Card className='card-item mx-auto'>
            <Card.Img src={diningImg} variant='top' style={{height:'200px'}}/>
            <Card.Body>
              <Card.Title>Dining</Card.Title>
              <Card.Text>View the city&apos;s favourite dining venues </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}  className='p-0'>
          <Card className='card-item mx-auto'>
            <Card.Img src={eventImg} variant='top' style={{height:'200px'}}/>
            <Card.Body>
              <Card.Title>Live Events</Card.Title>
              <Card.Text>Discover kenyan&apos;s best events & concerts</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
     </Container>

       <section className='container mt-4 trends'>
        <h2>Collections</h2>
        <div className='d-flex collec-text'>
          <p>
            Explore curated lists of top restaurants, cafes, pubs, and bars in Nairobi KE, based on trends
          </p>
          <span className='text-danger ms-auto'>
              All collections in Nairobi
              <ArrowRightIcon/>
            </span>
        </div> 

       </section>

      <Container fluid className='collections  mt-3'>
       <Row className='gap-4 mx-auto  justify-content-center'>
        <Col md={3} className='card1 card-item item '>
             <p className='mb-0 ms-3'>Top trendeing sports</p>
             <span className='ms-3'>
              42 places
              <ArrowRightIcon/>
             </span>
          
        </Col>
        <Col md={3} className='card3 card-item item'>
        
             <p className='mb-0 ms-3'>Hot chocolate Hevens</p>
             <span className='ms-3'>
              63places
              <ArrowRightIcon/>
             </span>
         
        </Col>
        <Col md={3} className='card4 card-item item'>
             <p className='mb-0 ms-3'>Strawberry sweet treats</p>
             <span className='ms-3'>
              52 places
              <ArrowRightIcon/>
             </span>
          
        </Col>
      </Row>
    </Container>

       <Container className='d-flex align-items-center footer-lead' style={{marginTop:'40px'}}>
         <div>
           <h1 className='footer-hero'>CuisineCove</h1>
         </div>
         <div className='d-flex gap-4 ms-auto select-div ' >
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

       <Container className='mt-4'>
        <Row md={4} sm={4} className='footer justify-content-center'>
        <Col className='footer-links'>
        <div>
          <h4 className='footer-text'>About CuisineCove</h4>
          <ul>
            <li><a href="#">Work with us</a></li>
            <li><a href="#">Who we are</a></li>
            <li><a href="#">Report Fraud</a></li>
            <li><a href="#">Investor relation</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        </Col>
        <Col md={4} sm={4} className='footer-links'>
        <div>
          <h4 className='footer-text'>For Restaurants</h4>
          <ul>
            <li><a href="#">Partner with us</a></li>
            <li><a href="#">Apps for you</a></li>
          </ul> 
        </div>
        </Col>
        <Col md={4} sm={4} className='footer-links'>
          <div>
          <h4 className='footer-text'>Learn More</h4>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
          </div>
        </Col>
        </Row>
        <div className='text-center py-4'>
          <small>PorshTech LTD &copy; 2024, All rights reserved</small>
        </div>
       </Container>


    
    </Container>
  )
}
export default Banner

Banner.propTypes={
  user: propTypes.func
}