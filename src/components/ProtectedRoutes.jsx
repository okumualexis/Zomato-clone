
import { decodedToken, getToken } from '../Composable/handleAuth'
import { Navigate, Outlet, } from 'react-router-dom'

const ProtectedRoutes = () => {
 
  const token = getToken()
  const decoded = token ? decodedToken(token) : null

 

  return decoded ? <Outlet/> : <Navigate to="/"/>      
}

export default ProtectedRoutes