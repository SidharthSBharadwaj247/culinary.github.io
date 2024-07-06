import React, { useEffect, useState } from "react";
import img1 from "../../assets/Recipe-card-img1.jpeg";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading, updateUser } from "../../store/slices/userSlice";
import { BASE_URL } from "../../utils";
import toast from "react-hot-toast";
import Loader from "../Loader";

const RecipeCard = ({ recipe }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const  [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const favs = user.favorites;
    console.log("Favs", favs);
    console.log(recipe._id);
    if (favs?.find((a) => a === recipe._id) !== undefined) {
      setIsFav(true);
    }
  }, [user, recipe]);
  const handleClick = async (action) => {
    setIsLoading(true)
    if (action === "remove") {
      const res = await axios.post(`${BASE_URL}/recipe/removeFav`, {
        recipe_id: recipe._id,
        user_id: user.id,
      });
      if (res.status === 200) {
        dispatch(updateUser({ id: recipe._id, action: "remove" }));
        toast.success("Removed From Favorites");
        console.log(res);
        setIsLoading(false)
        setIsFav(!isFav)
      }
    }else if(action === "add"){
      console.log(user)
      const res = await axios.post(`${BASE_URL}/recipe/addFav`, {
        recipe_id: recipe._id,
        user_id: user.id,
      });
      if (res.status === 200) {
        console.log(res);
        dispatch(updateUser({ id: recipe._id, action: "add" }));
        toast.success("Added to favorites")
        setIsLoading(false)
        setIsFav(!isFav)
      }
    }
  };
  

  return (
    <div className=" bg-[#f6eed5] rounded p-2 relative flex flex-col justify-between">
      <div className="absolute top-3 right-3 flex gap-2 items-center">
        <div
          className="bg-black/[0.6] rounded-full p-2 cursor-pointer"
          // onClick={() => setIsFav(!isFav)}
        >
          {isLoading?(
            <Loader
            primaryColor="#000000"
            secondaryColor="#e0e0e0"
            height={25}
            width={25}
          />
          ):(isFav ? (
            <FavoriteIcon
              className="text-white"
              onClick={() => handleClick("remove")}
            />
          ) : (
            <FavoriteBorderIcon
              className="text-white"
              onClick={() => handleClick("add")}
            />
          ))}
        </div>
      </div>
      <div>
        <img src={img1} alt="" className="w-full h-full rounded" />
      </div>
      <div className="flex flex-col gap-2 h-full">
        <div className="flex justify-between items-center">
          <p className="md:text-[22px] text-[18px] font-semibold">
            {recipe.Name}
          </p>
          <p className=" text-gray-500 text-[14px]">Ratings: 4.5/5</p>
        </div>
        <div className="text-[14px] flex items-center gap-2">
          {recipe.description}
          {/* <span className="h-[30px] w-[30px] rounded-full bg-slate-400"></span>
            <p>Binay Kumar Sahu</p> */}
        </div>
      </div>
      <Link
        to={`/desc/${recipe._id}`}
        className="border border-[#a7462c] rounded py-2 px-5 text-[18px] font-semibold bg-bg_secondary1 hover:shadow-btn_shadow text-[white] text-center"
      >
        View Recipe
      </Link>
    </div>
  );
};

export default RecipeCard;
