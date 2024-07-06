import React from 'react'
import img from '../assets/Recipe-card-img1.jpeg'
import { Link } from 'react-router-dom'

const SearchedRecipe = ({searchedRecipes,setShowSearch}) => {
  return (
    <div className='z-[11] absolute top-[60px] md:left-[25%] overflow-y-scroll rounded-md shadow-btn_shadow max-h-[400px] bg-[white] max-w-[700px] md:min-w-auto min-w-[340px]'>
        {searchedRecipes?.map((r,idx)=>(
            <Link to={`/desc/${r._id}`} className='flex items-center gap-2 border-b px-2 py-4' onClick={()=>setShowSearch(false)}>
                <div className=' flex-[0.1]'>
                    <img src={img} className='h-[40px] w-[40px]' alt="" />
                </div>
                <div className='flex flex-col flex-[0.9]'>
                    <p className='font-bold'>{r.Name}</p>
                    <p className='md:text[15px] text-[12px]'>{r.Description}</p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default SearchedRecipe
