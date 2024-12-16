import { jwtDecode } from "jwt-decode";

export const setToken = (token) =>{
  localStorage.setItem('authToken', token)
}

export const isTokenValid =() =>{
  const token = getToken()

  if(!token){
    console.warn('No token provided!')
    return false
  }

  try {

    const decoded = jwtDecode(token)
     const currentTime = Date.now() / 1000;
     if(decoded.exp > currentTime ){
       return true;
     }else{
      console.warn("Token has expired")
      return false
     }
    
  } catch (error) {
    console.error("Error decoding the token", error)
    return false
  }
}

export const getToken =() =>{
  const token = localStorage.getItem('authToken')

  return token;
}

export const decodedToken = (token) =>{
  if(!token){
    console.warn('No token provided!')
    return null
  }

  try {
    const decoded = jwtDecode(token)
    return decoded || null;
  } catch (error) {
    console.error("Failed to decode token",error)
    return null
  }
}

export const logout =() =>{
  localStorage.removeItem('authToken')
}