import React, { useState } from 'react'
import MyRecipeMain from '../components/myRecipe/MyRecipeMain'
import AddRecipe from '../components/homepage/AddRecipe'
import AddRecipeModal from '../components/AddRecipeModal'


const MyRecipePage = () => {
  const [showModal,setShowModal] = useState(false)
  return (
    <div className='h-full'>
        <MyRecipeMain/>
        <AddRecipe setShowModal = {setShowModal}/>
        {showModal && <AddRecipeModal setShowModal = {setShowModal}/>}
    </div>
  )
}

export default MyRecipePage
