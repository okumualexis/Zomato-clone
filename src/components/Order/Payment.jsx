import { Button, Form, Modal, Table } from "react-bootstrap"
import propTypes from "prop-types"
import { useCart } from "../../Hooks/CartContext"
import { useState } from "react"
import axios from "axios"




const Payment = ({show, closeModal,total}) => {
  const [paymentInfo, setPaymentInfo] = useState({
    residence:'',phone:''
  })
  const [consent, setConsent ] = useState(false)
  const handleChange =(e)=>{
    const {name, value } = e.target;
    setPaymentInfo(prev => ({...prev, [name]:value}))
  }

  const handlePayment = async(e)=>{
    e.preventDefault()
    const paymentData ={
      residence: paymentInfo.residence,
      phone: paymentInfo.phone,
      amount: total,
    }

    if(!paymentInfo.residence || !paymentInfo.phone || !consent){
      console.log("Please fill all fields")
      return
    }else{

      try {
        const response = await axios.post('http://localhost:8800/api/payments',paymentData)
        console.log(response.data)
       
      } catch (error) {
       console.log("Error making payment",error)
      }
    }
 
  }

 const {cartCount } = useCart()

  return (
    <div>
      <Modal show={show} size="lg" >
        <Modal.Header>
          <Modal.Title>Make payments</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'var(--gray-2)'}}>
          
           <Table striped>
            <thead>
              <tr>
                <th className="text-center">Order summary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="d-flex">Item&apos;s total ({cartCount}) <div className="ms-auto">Ksh {total}</div></td>
                <td className="d-flex">Delivery fees <div className="ms-auto">free</div></td>
              </tr>
              <tr>
                <td className="d-flex fw-bold fs-3">Total <div className="ms-auto fw-bold fs-3">Kshs {total}</div></td>
              </tr>
              </tbody>
           </Table>
              <Form className="mt-3 w-75">
              <Form.Group>
                <Form.Label>Residencial Address</Form.Label>
                <Form.Control
                  type="address"
                  required
                  placeholder="Residencial location"
                  name="residence"
                  value={paymentInfo.residence}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter Phone number to make payment</Form.Label>
                <Form.Control 
                    type="tel"
                    required
                    placeholder="Phone number"
                    name="phone"
                    value={paymentInfo.phone}
                    onChange={handleChange}
                />
              </Form.Group>
              <Form.Check
                 className="mt-3"
                 type="checkbox" 
                 value={consent}
                 required
                 onChange={(e)=> setConsent(e.target.checked)}
                 label='Confirm the order'/>
            </Form>
            
            
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>closeModal()} >Cancel</Button>
          <Button type="submit"  onClick={handlePayment} >Proceed</Button>
        </Modal.Footer>

      </Modal>
    </div>
  )
}
Payment.propTypes={
  show: propTypes.bool,
  closeModal:propTypes.func,
  total:propTypes.number
}
export default Payment