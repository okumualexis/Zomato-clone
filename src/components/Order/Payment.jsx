import { Alert, Button, Form, Modal, Spinner, Table } from "react-bootstrap"
import propTypes from "prop-types"
import { useCart } from "../../Hooks/CartContext"
import { useState } from "react"
import axios from "axios"
import './Payment.scss'
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';




const Payment = ({show, closeModal,total}) => {
  const [paymentInfo, setPaymentInfo] = useState({
    residence:'',phone:''
  })
  const [consent, setConsent ] = useState(false)
  const [loading, setLoading ] = useState(false)
  const [errorMessage, setErrorMassage ] = useState('')
  const [sendSuccess, setSendSuccess ] = useState('')
  const [validation, setValidation ] = useState('')

  const {cartCount, clearCart } = useCart()

  const handleChange =(e)=>{
    const {name, value } = e.target;
    setPaymentInfo(prev => ({...prev, [name]:value}))
  }



  const handlePayment = async(e)=>{
    e.preventDefault()
    const paymentData ={
      residence: paymentInfo.residence.trim(),
      phone: paymentInfo.phone.trim(),
      amount: total,
    }

    if(!paymentInfo.residence || !paymentInfo.phone || !consent){
      setValidation("Please fill all fields")
      setTimeout(()=>{
        setValidation('')
      },2000)
     return
    }
    else{

      setLoading(true)

      try {
        const response = await axios.post('https://porshtech-delivery.vercel.app/api/payments',paymentData)
        setSendSuccess(response.data.success)
        setLoading(false)
        setPaymentInfo(prev=>({...prev, phone:'',residence:''}))
        setConsent(false)
        setTimeout(()=>{
          setSendSuccess()
          clearCart()
          closeModal()
        },2000)

       
      } catch (error) {
       setErrorMassage(error.response?.data?.message || 'Unknown error had occured!')
       setTimeout(()=>{
        setErrorMassage(null) 
      },5000)
    }finally{
      setLoading(false)
    }
 
  }
 }

  return (
    <div>
      <Modal show={show} size="lg" >
        <Modal.Header>
          <Modal.Title>Make payments</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column" >
          
          
          <div className="align-self-end">
            {sendSuccess && (<Alert className="py-2 d-flex gap-1 align-items-center" variant="success"><CheckCircleIcon style={{color:'green'}}/>{sendSuccess}</Alert>)}
            {validation && (<Alert className="py-2 d-flex gap-1 align-items-center" variant="danger"><ErrorIcon/>{validation}</Alert>)}
            {
              errorMessage && (
                <Alert className="py-2" variant="danger">
                  <Alert.Heading className="d-flex gap-1 align-items-center"><ReportProblemIcon/>Oh snap! Your got an Error</Alert.Heading>
                  <p>{errorMessage}</p>
                </Alert>
              )
            }
          </div>
          
          
           <Table >
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
          <Button variant="danger"  onClick={()=>closeModal()} >Cancel</Button>
          {
            loading ? (
             <Button type="submit" variant="success" disabled >
               <Spinner animation="grow" size="sm" className="pe-2"/>
               Procesing...
              </Button>)
             :(
              <Button type="submit" disabled={!total}  onClick={handlePayment} >Proceed</Button>
            )
          }
          
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