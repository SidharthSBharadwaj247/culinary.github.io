import React, { useEffect, useState } from "react";
import RecipeCard from "../homepage/RecipeCard";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDown from "../DropDown";
import { useSelector } from "react-redux";

const MyRecipeMain = () => {
  const [dropDown, setDropDown] = useState(false);
  const [cat, setCat] = useState("All Recipes");
  const { recipes } = useSelector((state) => state.allRecipes);
  const user = useSelector((state) => state.user);
  const [catArr, setCatArr] = useState(recipes);

  useEffect(() => {
    const r = recipes.filter((r) => user.id === r.Author);
    if (cat !== "All Recipes") {
      const category = r.filter((r) => r.category === cat);
      setCatArr(category);
    } else {
      setCatArr(r);
      console.log(recipes);
    }
  }, [cat, recipes]);
  return (
    <>
      <div className="m-4 md:mt-[100px] mt-[120px] md:text-[30px] text-[20px] font-bold text-center flex justify-between relative items-center">
        <p>My Recipes</p>
        <button
          className="border border-[#a7462c] rounded py-2 px-5 text-[12px] font-semibold bg-bg_secondary1 shadow-btn_shadow text-white "
          onClick={() => setDropDown(!dropDown)}
        >
          {cat}
          <ArrowDropDownIcon />
        </button>
        {dropDown && <DropDown setCat={setCat} setDropDown={setDropDown} />}
      </div>
      {catArr.length > 0 ? (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 p-3">
          {catArr?.map((recipe, idx) => (
            <RecipeCard recipe={recipe} key={idx} />
          ))}
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center absolute top-0 left-0">
          <h1 className="text-black/[0.8] font-extrabold md:text-[40px] text-[30px] text-center">You Have not yet added any recipe</h1>
        </div>
      )}
    </>
  );
};

export default MyRecipeMain;
