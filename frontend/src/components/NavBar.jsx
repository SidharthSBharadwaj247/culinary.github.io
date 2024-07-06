import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { storeRecipes } from '../store/slices/allRecipes'
import { addUser, toggleLoading } from '../store/slices/userSlice'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchedRecipe from './SearchedRecipe'
import { BASE_URL } from '../utils'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state=> state.user)
  const { recipes } = useSelector((state) => state.allRecipes);
  const [showLogOut,setShowLogOut] = useState(false)
  const [allRecipes,setAllRecipes] = useState([])
  const [searchedRecipes,setSearchedRecipes] = useState([])
  const [showSearch,setShowSearch] = useState(false)
  const loadData = async()=>{
    dispatch(toggleLoading(true))
    const res = await axios.get(`${BASE_URL}/recipe/getAllRecipes`)
    if(res.status === 200){
      dispatch(toggleLoading(false))
      dispatch(storeRecipes(res.data.recipes))
    }
    console.log(res)
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if(isLoggedIn){
      dispatch(addUser(JSON.parse(localStorage.getItem('userInfo'))))
      console.log(user)
    }
  }

  console.log(recipes)

  const dataInp = (e)=>{
    const val = e.target.value;
    if(val === ""){
      setShowSearch(false)
      setSearchedRecipes([])
    }else{
      setShowSearch(true);
      setSearchedRecipes(recipes?.filter((p)=> p.Name.toLowerCase().includes(val.toLowerCase())))
    }
    console.log(searchedRecipes)
  }
  useEffect(()=>{
    loadData()
  },[])
  useEffect(()=>{
    setAllRecipes(recipes)
  },[recipes])
  const handleLogout = ()=>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <div className='md:flex hidden w-full justify-between items-center h-16 px-4 bg-[#FFFBEF] shadow fixed top-0 left-0 z-[10]'>
      <Link to='/home'>
        <span className='text-secondary1 md:text-[18px] text-[14px]  font-bold'>Culinary</span>
        <span className='text-secondary3 md:text-[18px] text-[14px]  font-bold'>Share</span>
      </Link>
      <div>
        <form action="">
          <input type="text" placeholder='Search for your favorite recipes' className='bg-transparent border px-7 py-2' onChange={dataInp}/>
          <button className='bg-bg_secondary2 text-white px-4 py-2 rounded font-semibold'>Search</button>
        </form>
      </div>
      <div className='flex gap-2'>
        <Link to='/favorites'><button className='bg-bg_secondary2 text-white px-4 py-2 rounded font-semibold'>Favorites</button></Link>
        <Link to='/myRecipes'><button className='bg-bg_secondary1 text-white px-4 py-2 rounded font-semibold'>My Recipes</button></Link>
        {user && (
        <div className='relative'>
          <img src={user?.image} className='rounded-full object-contain h-[40px] cursor-pointer' alt = "Profile image" onClick={()=>setShowLogOut(!showLogOut)}/>
          {showLogOut && <div onClick={handleLogout} className='absolute right-1 flex gap-2 bg-[#FFFBEF] min-w-[100px] z-[10] shadow-btn_shadow px-4 cursor-pointer py-3'><span className='font-semibold'>LogOut</span> <LogoutIcon/></div>}
        </div>
        )}
        
      </div>
      {showSearch && <SearchedRecipe searchedRecipes = {searchedRecipes} setShowSearch = {setShowSearch}/>}
    </div>
  )
}

export default NavBar
