const Recipes = require("../models/recipes");
const User = require("../models/user")

const getRecipe = async (req, res) => {
  console.log("Req made for all recipes")
  try {
    const recipes = await Recipes.find();
    if (recipes) {
      return res.status(200).json({ recipes: recipes });
    } else {
      return res.status(404).json({ message: "No recipes found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getARecipe = async (req,res)=>{
  const {id} = req.params
  console.log("Req recieved for: ",id)
  try{
    const recipeDet = await Recipes.findOne({_id:id})
    if(recipeDet){
      return res.status(200).json({ det: recipeDet });
    } else {
      return res.status(404).json({ message: "No recipes found" });
    }

  }catch(err){
    return res.status(500).json({ error: err });
  }
}

const getFavorites = async (req,res)=>{
  const {id} = req.params
  console.log("Req made for fav recipes by: ",id)
  try {
    const user = await User.findOne({_id:id});
    if (user) {
      const favs = user.favorites
      console.log(favs)
      const r = await Recipes.find({_id:{$in: favs}})

      // favs.forEach((f)=>{
      //   const v = getFav(f)
      //   r.push(v)
      // })
      console.log(r)
      return res.status(200).json({ favRecipes: r });
    } else {
      return res.status(404).json({ message: "No recipes found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const removeFromFavorites = async (req,res)=>{
  const {user_id,recipe_id} = req.body
  console.log("Req made for deleting fav recipe: ",recipe_id,"by",user_id)
  try {
    const updated = await User.updateOne(
      { _id: user_id },
      { $pull: { favorites: recipe_id } }
    );
    console.log(updated)
    if (updated.modifiedCount === 1) {
      return res.status(200).json({ message:"Deleted successfully" });
    } else {
      return res.status(404).json({ message: "No recipes found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }

}
const addToFavorites = async (req,res)=>{
  const {user_id,recipe_id} = req.body
  console.log("Req made for adding fav recipe: ",recipe_id," by ",user_id)
  try {
    const updated = await User.updateOne(
      { _id: user_id },
      { $push: { favorites: recipe_id } }
    );
    if (updated.modifiedCount === 1) {
      console.log(updated)
      return res.status(200).json({ message:"Added successfully" });
    } else {
      return res.status(404).json({ message: "No recipes found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }

}
const addRecipe= async (req,res)=>{

  const {name,description,author,time,category,ingredient,method} = req.body
  // var v1 = ingredient.toString()
  // var v2 = method.toString()
  // var s = v1.split(",")
  // var m = v2.split(",")

  console.log(ingredient)
  console.log(method)
  try {
    const newRecipe = new Recipes({
      Name:name,
      Description:description,
      Author:author,
      time:time,
      category:category,
      Ingredients: ingredient,
      Method: method
    })
    await newRecipe.save()
    return res.status(200).json({ message:"Added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

}

// const split = (arr)=>{
//   let finalArr = []
//   let str = ""
//   for (let index = 0; index < arr.length; index++) {
//     if(arr[index] === ','){
//       finalArr.push(str)
//       str = ""
//     }
//     else{
//       str = str + arr[index]
//     }
//   }
//   finalArr.push(str)
//   return finalArr
// }



exports.getRecipe = getRecipe;
exports.getFavorites = getFavorites;
exports.removeFromFavorites = removeFromFavorites;
exports.addToFavorites = addToFavorites;
exports.getARecipe = getARecipe;
exports.addRecipe = addRecipe;
