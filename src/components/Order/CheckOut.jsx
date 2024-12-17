
import { Link } from 'react-router-dom'
import { useCart } from '../../Hooks/CartContext'
import './CheckOut.scss'
import { Button, Container, Table } from 'react-bootstrap'
import { useState } from 'react'
import Payment from './Payment'

const CheckOut = () => {
  const [show, setShow ] = useState(false)
 

  const {cartItems , cartCount, removeItem, reduceItemCount,AddItemCount, clearCart } = useCart()

  const showModal =() =>{
    setShow(true)
  }
  const hideModal=()=>{
    setShow(false)
  }

  const subtotal = cartItems.reduce((total,item)=> total + item.price*item.quantity,0)
  const tax = subtotal * 0.02
  const grandTotal = subtotal + tax;
  
  return (
    <Container>
      <div className='cart-bar'>
        <div className='cart-brand ps-4'>
          <Link to='/'>CuisineCove</Link>
        </div>
        <ul className='mb-0'>
          <li><Link to='/order'>Order More</Link></li>
          <li><Link>Top offers</Link></li>
          <li>
            <Button onClick={clearCart} className='py-0' variant='secondary'>Clear Cart</Button>
          </li>
        </ul>
      </div>
      <h1 className='text-center mt-2'>Your Cart [{cartCount} items]</h1>
      <div style={{
        height:'80vh',
        overflowY:'auto',
        position:'relative'
      }}>
      <Table striped hover>
        <thead  style={{
        position:'sticky',
        top:0,
        zIndex:2
      }}>
          <tr>
            <th>Item</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Quantity</th>
            <th className='text-center'>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map(item =>(
              <tr key={item._id}>
                <td className='d-flex align-items-center gap-3'>
                  <div>
                    <img width={60} src={item.image} alt="" />
                  </div>
                  <div>
                    <h6 className='mb-0'>{item.name}</h6>
                    <p className='mb-1'>{item.restaurant}</p>
                    <Button onClick={()=> removeItem(item._id)}  className='py-0 ms-4' variant='danger'>Remove</Button>
                  </div>
                </td>
                <td className='text-center align-middle'>
                  {item.price}Ksh
                </td>
                <td className='text-center align-middle'>
                  <div className='quantity'>
                    <button onClick={()=>reduceItemCount(item._id)} className='btn-q dec'>-</button>
                    <button className='btn-display'>{item.quantity}</button>
                    <button onClick={()=>AddItemCount(item._id)} className='btn-q inc'>+</button>
                  </div>
                </td>
                <td className='text-center align-middle'>
                  {item.price * item.quantity}
                </td>
              </tr>
            ))
          }
          <tr>
          <td colSpan="3" className="text-end fw-bold no-border">
              Subtotal:
            </td>
            <td className="text-center fw-bold">
              {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} Ksh
            </td>
          </tr>
          <tr >
             <td colSpan='3' className='text-end fw-bold no-border'>
              Tax:
             </td>
             <td colSpan='3' className='text-center fw-bold '>
               0.02%
             </td>
          </tr>
          <tr >
             <td colSpan='3' className='text-end fw-bold no-border'>
              Grand Total:
             </td>
             <td colSpan='3' className='text-center fw-bold'>
             {cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.02 +
             cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} Ksh
             </td>
          </tr>
          <tr>
            <td colSpan='4' className='text-end pe-5 no-border pt-3'>
              <Button disabled={!cartItems.length} onClick={showModal}>Check out</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      </div>
       
       <Payment show={show} closeModal={hideModal} total={grandTotal} />
    </Container>
  )
}

export default CheckOut