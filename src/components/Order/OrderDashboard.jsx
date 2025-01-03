
import { Badge, Button, Card, Col, Container,  Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCart } from '../../Hooks/CartContext'
import './Orderdashboard.scss'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {  decodedToken, getToken, isTokenValid } from '../../Composable/handleAuth'

const OrderDashboard = () => {
  const [foods, setFoods ] = useState([])
  const [searchFav, setSearchFav] = useState('')
  const [addedToCart, setAddedToCart ] = useState([])
  const { addToCart, cartCount } = useCart()

   const token = getToken()
  const decoded = decodedToken(token)

  useEffect(()=>{
    const fetchFood = async()=>{
      const token = getToken()

      if(!token && !isTokenValid()){
        console.log("Permission denied!")
        return
      }
      try {
        const response = await axios.get('https://porshtech-delivery.vercel.app/api/foods',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setFoods(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFood()

  },[])

  const filteredFood = foods.filter(fav => fav.name.toLowerCase().includes(searchFav.toLowerCase()))

  const cartAddItem =(item)=>{
    if(addedToCart.includes(item._id)) return;
    addToCart(item)
    setAddedToCart(prev=> [...prev, item._id])
  }

   

  return (
    <div>
      <Container className='navBar' fluid style={{
        backgroundColor:'var(--gray-3)',
        position:'sticky',
        top:0,
        zIndex:2,
        display:'flex',
        alignItems:'center'
      }}>
        <div className='brand-name'>
        <Link to='/'>CuisineCove</Link>
        </div>
        <div className='form-control d-flex search-input'>
          <SearchIcon className='search-icon' />
          <input type="text" value={searchFav}
           onChange={(e)=> setSearchFav(e.target.value)}
           placeholder='Search favourite dish' style={{width:'92%'}} />
        </div>
        <ul>
          { 
          decoded.role ==='admin' &&
          ( <li><Link to='/admin'>Admin</Link></li>)
          }
         
          <li><Link to='/checkout'>
           <ShoppingCartCheckoutIcon/>
           <Badge pill bg='secondary'>{cartCount}</Badge></Link></li>
        </ul>
      </Container>

      <Container fluid>
        <Row className='d-flex  mx-auto'>
            {
              filteredFood.map(food =>(
                <Col key={food._id} className='mb-4' sm={5} lg={3} >
                  <Card>
                    <Card.Img  src={food.image} style={{height:'240px'}}/>
                    <Card.Body>
                        <Card.Title className='d-flex'>{food.name} <span className='ms-auto'>{food.price}Ksh</span></Card.Title>
                        <Card.Text>{food.restaurant}</Card.Text>
                        <div className='text-center'>
                        <Button variant={addedToCart.includes(food._id) ?'primary' :'success'} disabled={addedToCart.includes(food._id)} onClick={()=>cartAddItem(food)}>
                           { addedToCart.includes(food._id) ? <span>Added to Cart</span>:'Add to cart'}
                          </Button>
                        </div>
                    </Card.Body>
                    
                  </Card>
                </Col>
              ))
            }  
        </Row>
      </Container>
    </div>
  )
}

export default OrderDashboard