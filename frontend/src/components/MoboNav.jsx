import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import SearchedRecipe from './SearchedRecipe';
import MenuIcon from '@mui/icons-material/Menu';
import HamBurger from './HamBurger';
import { Link } from 'react-router-dom';

const MoboNav = () => {
    const { recipes } = useSelector((state) => state.allRecipes);
    const [showSearch,setShowSearch] = useState(false)
    const [searchedRecipes,setSearchedRecipes] = useState([])
    const [showHam,setShowHam] = useState(false)
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
  return (
    <div className='md:hidden flex w-full justify-between items-center h-16 px-4 bg-[#FFFBEF] shadow fixed top-0 left-0 z-[10]'>
      <div className='border'>
        <MenuIcon onClick = {()=>setShowHam(!showHam)}/>
      </div>
      {showHam && <HamBurger setShowHam = {setShowHam}/>}

      <Link to='/home'>
        <span className='text-secondary1 text-[15px] font-bold'>Culinary</span>
        <span className='text-secondary3 text-[15px] font-bold'>Share</span>
      </Link>
      <div>
        <form action="">
          <input type="text" placeholder='Search for your favorite recipes' className='bg-transparent border px-5 py-2 text-[12px] sm:w-auto w-[140px]' onChange={dataInp}/>
          <button className='bg-bg_secondary2 text-white px-2 ml-1 py-1 rounded font-semibold '><SearchIcon className='text-[12px]'/></button>
        </form>
      </div>
      {showSearch && <SearchedRecipe searchedRecipes = {searchedRecipes} setShowSearch = {setShowSearch}/>}
    </div>
  )
}

export default MoboNav
