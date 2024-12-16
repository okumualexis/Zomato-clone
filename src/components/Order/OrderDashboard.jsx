
import { Badge, Button, Card, Col, Container,  Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCart } from '../../Hooks/CartContext'
import './Orderdashboard.scss'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const OrderDashboard = () => {
  const [foods, setFoods ] = useState([])
  const [searchFav, setSearchFav] = useState('')
  const { addToCart, cartCount } = useCart()

  useEffect(()=>{
    const fetchFood = async()=>{
      try {
        const response = await axios.get('http://localhost:8800/v2/foods')
        setFoods(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFood()

  },[])

  const filteredFood = foods.filter(fav => fav.name.toLowerCase().includes(searchFav.toLowerCase()))

 


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
        <div className='form-control d-flex search-input w-25'>
          <SearchIcon/>
          <input type="text" value={searchFav}
           onChange={(e)=> setSearchFav(e.target.value)}
           placeholder='Search favourite dish' style={{width:'92%'}} />
        </div>
        <ul>
          <li><Link to='/admin'>Admin</Link></li>
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
                        <Button onClick={()=>addToCart(food)} variant="primary">Add to Cart</Button>
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