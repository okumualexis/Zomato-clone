import { useState, createContext, useContext } from "react";

const CartContext = createContext()

export const useCart =()=> useContext(CartContext)

export const CartProvider =({children}) =>{
  const [cartCount, setCartCount ] = useState(0)
    const [cartItems, setCartItems ] = useState([])

  const addToCart = (product)=>{
    setCartItems(prevItems =>{
      const alreadyAdded = cartItems.find(item => item._id === product._id)

      if(alreadyAdded){
        return prevItems.map(item => 
          item._id === product._id 
          ? {...item, quantity: item.quantity + 1} : item
        )
      }else{
        return [...prevItems,{...product, quantity: 1}]
      }
     })

     setCartCount(cartCount + 1)
  }

  const clearCart =() =>{
    setCartItems([])
    setCartCount(0)
  }

  const removeItem =(id)=>{
  const itemToRemove = cartItems.find(item => item._id === id)

  if(itemToRemove){
    const updatedCart = cartItems.filter(item => item._id !== id)
    setCartItems(updatedCart)
    setCartCount(cartCount - itemToRemove.quantity)
    }

  }

  const reduceItemCount =(itemId)=>{
    const updatedCart = cartItems.map(item =>{
      if(item._id === itemId){
        if(item.quantity > 1){
          return { ...item, quantity:item.quantity - 1}
        }
        return null
      }

      return item
    }).filter(Boolean)
    const targetItem = cartItems.find(item => item._id === itemId)
    if(targetItem){
      setCartItems(updatedCart)
      setCartCount(cartCount -1)
    }
  }
  const AddItemCount =(itemId)=>{
    const updatedCart = cartItems.map(item =>{
      if(item._id === itemId){
        if(item.quantity >= 1){
          return { ...item, quantity:item.quantity + 1}
        }
        return null
      }

      return item
    }).filter(Boolean)
    const targetItem = cartItems.find(item => item._id === itemId)
    if(targetItem){
      setCartItems(updatedCart)
      setCartCount(cartCount + 1)
    }
  }

  return(
    <CartContext.Provider value={{cartCount,cartItems, addToCart, removeItem,reduceItemCount,AddItemCount,clearCart}}>
      {children}
    </CartContext.Provider>
  )
}