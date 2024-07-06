import { createSlice } from "@reduxjs/toolkit";

export const allRecipeSlice = createSlice({
  name: "allRecipe",
  initialState: {
    recipes: [],
  },
  reducers: {
    storeRecipes: (state, action) => {
      state.recipes = action.payload
    },
    addMultipleToCart: (state, action) => {
      console.log(action.payload);
        state.cartItems = [...action.payload];
        console.log(state.cartItems);
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        const price = parseInt(p.price.slice(1))
        if (p._id === action.payload.id) {
          if (action.payload.key === "quantity") {
            p.selectedQuantityPrice = price * action.payload.val;
          }
          return { ...p, [action.payload.key]: action.payload.val };
        }
        return p;
      });
    },
    removeFromCart: (state, action) => {
      console.log("Payload->",action.payload)
      state.cartItems = state.cartItems.filter(
        (p) => p._id !== action.payload
      )
    },
    emptyCart: (state) => {
      state.cartItems = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { storeRecipes, updateCart, removeFromCart,addMultipleToCart,emptyCart } = allRecipeSlice.actions;

export default allRecipeSlice.reducer;
