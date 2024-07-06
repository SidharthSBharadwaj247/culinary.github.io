const express = require("express");
const auth = require("../middleware/validator")

const router = express.Router();
const getRecipe = require("../contollers/recipe")

// router.use(auth);

router.get("/getAllRecipes",getRecipe.getRecipe)
router.get("/getFavorites/:id",getRecipe.getFavorites)
router.post("/removeFav",getRecipe.removeFromFavorites)
router.post("/addFav",getRecipe.addToFavorites)
router.get("/getARecipe/:id",getRecipe.getARecipe)
router.post("/addRecipe",getRecipe.addRecipe)

module.exports = router;