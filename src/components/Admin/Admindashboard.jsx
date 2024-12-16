import { Link, Route, Routes } from "react-router-dom"
import AddFood from "../Order/AddFood"
import './Admindashboard.scss'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const Admindashboard = () => {
  return (
    <>
      <div className="header-bar">
       <h1>CuisineCove</h1>
      </div>
      <main className="admin-panel">
        {/* nav links */}
        <div className="sideNav">
          <ul>
            <li><Link to=''>
            <LibraryAddIcon className="pe-2" style={{color:'var(--gray-7)',fontSize:'var(--font-size-5)'}}/>
              Add dish
            </Link></li>
            <li><Link to='/order'>
            <AutoDeleteIcon className="pe-2" style={{color:'var(--gray-7)',fontSize:'var(--font-size-5)'}}/>
              Dishes log
            </Link></li>
            <li><Link to=''>
            <GroupAddIcon className="pe-2" style={{color:'var(--gray-7)',fontSize:'var(--font-size-5)'}}/>
             Users
            </Link></li>
          </ul>
         
         
        </div>
        {/* content display here */}
        <div className="content-area">
          <Routes>
            <Route path="" element={<AddFood/>} />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default Admindashboard