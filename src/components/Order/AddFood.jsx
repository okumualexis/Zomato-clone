import axios from 'axios'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import RotateRightIcon from '@mui/icons-material/RotateRight'


const AddFood = () => {
  const [foodItems, setFoodItems] = useState({
   name:'',price:'', restaurant:'', image:''
  })
  const [image, setImage ] = useState('')
  const [loading, setLoading ] = useState(false)
  

   const handleOnChange = (e)=>{
    const { name, value } = e.target;
    setFoodItems(prev=> ({...prev, [name]:value}))
   }

   const imagePreview =(file)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload =()=>{
      const result = reader.result
      setImage(result)
    }
   }

   const handleImageChange =(event)=>{
    const file = event.target.files[0]
    setFoodItems(prev =>({ ...prev, image:file}))
    imagePreview(file)
   }

   const handleSubmit = async(e)=>{
    e.preventDefault()
    const food = {
      name:foodItems.name,
      price: foodItems.price,
      restaurant: foodItems.restaurant,
      image: image
    }

     setLoading(true)
   
     try {
        await axios.post('https://porshtech-delivery.vercel.app/api/foods',food)
        setLoading(false)
       setFoodItems(prev => ({...prev,name:'',price:'',restaurant:'',image:''}))
       setImage('')
     } catch (error) {
      console.log(error)
     }finally{
      setLoading(false)
     }
    
   }

  return (
    <div className='container'>
       <Form className='w-75 mx-auto pt-4' onSubmit={handleSubmit} >
        <Row className='d-flex gap-4'>
          <Col sm={6}>
          <Form.Group>
          <Form.Label>Add the dish Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            placeholder='Dish Name'
            value={foodItems.name}
            onChange={handleOnChange}
            
          />
        </Form.Group><br/>

        <Form.Group>
          <Form.Label>Add restaurant Name</Form.Label>
          <Form.Control
            type='text'
            name='restaurant'
            placeholder='Restaurant Name'
            value={foodItems.restaurant}
            onChange={handleOnChange}
           
          />
        </Form.Group><br/>

        <Form.Group>
          <Form.Label>Dish price</Form.Label>
          <Form.Control
            type='number'
            name='price'
            placeholder='price'
            value={foodItems.price}
            onChange={handleOnChange}
            className='w-25'
          />
        </Form.Group><br/>

         <Form.Group>
          <Form.Label>Upload dish Image</Form.Label>
          <Form.Control
            type='file'
            onChange={handleImageChange}
            className='w-50'
            
          />
         </Form.Group><br/>
          </Col>
          <Col
              className='d-flex justify-content-center align-items-center'
              sm={4}>
              <div className='mb-3' style={{
                width:'500px'
              }} >
                <img src={image} style={{width:'100%'}}/>
              </div>
              </Col>
          
        </Row>
         {
           loading ? (
            <Button className='ms-5' >
               <RotateRightIcon style={{animation:'var(--animation-spin)',fontSize:'var(--font-size-1)'}}/>
               Adding...
              </Button>
           ) : (

             <Button className='ms-5' type='submit' variant='success'>Add Dish</Button>
           )
         }
        
       </Form>
    </div>
  )
}

export default AddFood