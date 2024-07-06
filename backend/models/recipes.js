const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  Name:{
    type:String,
    required:true
  },
  // url: {
  //   type: String,
  //   required: true,
  // },
  Description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  Author: {
    type: mongoose.Types.ObjectId, 
    ref:"User" ,
    required: true,
  },
  Ingredients: {
    type: Array,
    required: true,
  },
  Method: {
    type: Array,
    required: true,
  }
});

const RecipeList = new mongoose.model("Recipes", RecipeSchema);

module.exports = RecipeList;
