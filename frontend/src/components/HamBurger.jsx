import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const HamBurger = ({setShowHam}) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const handleLogout = ()=>{
        setShowHam(false)
        localStorage.clear()
        navigate('/')
    }
  return (
    <div className='z-[11] text-[15px] absolute top-[60px] md:left-[25%] overflow-y-scroll rounded-md shadow-btn_shadow max-h-[400px] bg-[white] min-w-[150px] max-w-[170px]'>
        <div className='border-b px-1 py-3 flex gap-2 items-center'>
            <img src={user.image} alt="" className='h-[40px] w-[40px] object-contain rounded-full bg-slate-400'/>
            <span className='font-semibold'>{user.username}</span>
        </div>
        <Link to="/about" className='border-b px-1 py-3' onClick={()=>setShowHam(false)}>
            <span>About us</span>
        </Link>
        <div className='border-b px-1 py-3 w-full flex justify-between' onClick={handleLogout}>
            Log out <LogoutIcon/>
        </div>
    </div>
  )
}

export default HamBurger
