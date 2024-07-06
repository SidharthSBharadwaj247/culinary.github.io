import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const AddRecipe = ({setShowModal}) => {
  return (
    <div className='rounded-full p-4 bg-bg_secondary2 text-white flex gap-2 cursor-pointer fixed bottom-3 right-3 shadow' onClick={()=>setShowModal(true)}>
        <AddIcon/>
        <p className='md:block hidden'>Add your recipes</p>
    </div>
  )
}

export default AddRecipe
