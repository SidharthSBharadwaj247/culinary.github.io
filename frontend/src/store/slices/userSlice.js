import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username:"",
    email:"",
    image:"",
    isLoggedIn: false,
    token:"",
    id:"",
    favorites:[],
    isLoading: false
  },
  reducers: {
    addUser: (state,action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.favorites = action.payload.favorites
      state.isLoggedIn = true;
      // localStorage.setItem("userInfo",JSON.stringify(action.payload));
      // localStorage.setItem("isLoggedIn",state.isLoggedIn);
    },
    updateUser: (state,action)=>{
      if(action.payload.action === "remove"){
        const favs = state.favorites.filter((f)=>f !== action.payload.id)
        state.favorites = favs;
      }else if(action.payload.action === "add"){
        const favs = state.favorites;
        favs.push(action.payload.id)
        state.favorites = favs;
      }
      localStorage.removeItem("userInfo")
      localStorage.setItem("userInfo",JSON.stringify(state));
    },
    toggleLoading:(state,action)=>{
      state.isLoading = action.payload
    }
  },
})
export const { addUser,updateUser, toggleLoading } = userSlice.actions

export default userSlice.reducer