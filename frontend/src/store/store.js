import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import allRecipeReducer from './slices/allRecipes'

export default configureStore({
  reducer: {
    user: userReducer,
    allRecipes: allRecipeReducer,
  },
})