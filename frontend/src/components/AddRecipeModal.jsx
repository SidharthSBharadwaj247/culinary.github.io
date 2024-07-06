import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils";
import { toggleLoading } from "../store/slices/userSlice";
import CategoryOptions from "./CategoryOptions";

const AddRecipeModal = ({ setShowModal }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [recipeDet, setRecipeDet] = useState({
    name: "",
    description: "",
    time: "",
    category: "",
  });
  const [method,setMethod] = useState()
  const [ingredient,setIngredient] = useState()
  const options = ['Veg', 'Non-Veg','Indian','Italian'];
  const [err,setErr] = useState("")
  const dataInp = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setRecipeDet({ ...recipeDet, [name]: val });
};
    console.log(recipeDet)
  const handleAdd = async () => {
    
    if (
      recipeDet.category !== "" &&
      ingredient !== "" &&
      recipeDet.description !== "" &&
      method !== "" &&
      recipeDet.name !== "" &&
      recipeDet.time !== ""
    ) {
      dispatch(toggleLoading(true));
      const i = ingredient.split(",")
      const m = method.split(",")
      console.log(i)
      console.log(m)
      try {
        const res = await axios.post(`${BASE_URL}/recipe/addRecipe`, {
          ...recipeDet,
          author: user.id,
          method:m,
          ingredient:i
        });
        if (res.status === 200) {
          dispatch(toggleLoading(false));
          window.location.reload();
          setShowModal(false);
        }
      } catch (err) {
        setErr("Unwanted Error")
        dispatch(toggleLoading(false))
        console.log(err);
      }
    }else{
        setErr("Please fill out all the fields")
    }
  };
  return (
    <div className="flex justify-center items-center bg-black/[0.6] h-screen w-screen fixed left-0 top-0 z-[11] py-3">
      <div className="flex flex-col items-stretch gap-3 bg-white relative rounded py-6 px-4 shadow-md max-h-[600px] min-w-[300px] overflow-y-scroll">
        <div className="text-right absolute right-1 top-1">
          <CancelIcon
            onClick={() => setShowModal(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="md:text-[30px] text-[20px] font-bold text-center w-full">
          Add Recipe
        </div>
        <div className="flex gap-3 flex-col">
          <input
            type="text"
            placeholder="Name of recipe"
            className="px-2 py-4 rounded border md:text-[18px] text-[14px] w-full border-black"
            name="name"
            onChange={dataInp}
          />
          <div className="flex sm:flex-row flex-col gap-3">
            <input
              type="text"
              placeholder="Prep time"
              className="px-2 py-4 rounded border md:text-[18px] text-[14px] w-full border-black"
              name="time"
              onChange={dataInp}
            />
            {/* <select name="category" id="" defaultValue="Category" onChange={dataInp} className=" px-2 py-4 rounded border md:text-[18px] text-[14px] w-full border-black">
                <option value="Category" selected disabled hidden>Category</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Italian">Italian</option>
                <option value="Indian">Indian</option>
            </select> */}
            <CategoryOptions options={options} dataInp={dataInp}/>
          </div>
          <input
            type="text"
            placeholder="Description"
            className="px-2 py-4 rounded border md:text-[18px] text-[14px] w-full border-black"
            name="description"
            onChange={dataInp}
          />

          <textarea
            name="ingredient"
            id=""
            cols="30"
            rows="10"
            placeholder="Ingredients"
            className="px-2 py-4 rounded border md:text-[18px] text-[14px] w-full border-black"
            onChange={(e)=>setIngredient(e.target.value)}
          ></textarea>
          <textarea
            name="method"
            id=""
            cols="30"
            rows="10"
            placeholder="Making procedure"
            className="px-2 py-4 rounded border md:text-[18px] text-[14px] w-full border-black"
            onChange={(e)=>setMethod(e.target.value)}
          ></textarea>
            {err !== "" && <div className="text-red-600 mt-1">{err}</div>}
          {!user.isLoading ? (
            <button
              className="rounded-[20px] border-1 border-solid border-black/[0.9] bg-bg_secondary1 text-[#ffffff] text-[12px] font-bold py-[12px] px-[45px] uppercase transition-transform duration-1000 ease-in"
              onClick={handleAdd}
            >
              Add Recipe
            </button>
          ) : (
            <button
              type="button"
              class="rounded-[20px] border-1 border-solid border-black/[0.9] bg-bg_secondary1 inline-flex items-center justify-center text-[#ffffff] text-[12px] font-bold py-[12px] px-[45px] uppercase transition ease-in-out duration-150 cursor-not-allowed"
              disabled=""
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </button>
          )}
          
          
        </div>
      </div>
    </div>
  );
};

export default AddRecipeModal;
