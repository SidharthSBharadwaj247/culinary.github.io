import React, { useState } from "react";
import './css/HeroSection.css'
import AddRecipeModal from "../AddRecipeModal";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [showModal,setShowModal] = useState(false)
  return (
    <div className="h-[600px] w-full flex justify-center items-center px-3 hero_section_main">
      <div className="flex flex-col justify-center items-center">
        <h1 className="md:text-[50px] text-[40px] font-bold text-white text-center">Welcome to CulinaryShare</h1>
        <p className="md:text-[20px] text-[15px] text-white text-center">
          This is the best place where you can find all your favorite recipes,
          add new recipes and share them with your favorite ones!!
        </p>
        <div className="flex items-center gap-3">
        <Link to='#' className="border border-[#FFDF00] rounded py-2 px-5 text-[18px] font-semibold bg-bg_secondary2 shadow-btn_shadow mt-3" onClick={()=>setShowModal(true)}>Add Recipe</Link>
        <Link to='/about' className="border border-[#a7462c] hidden md:block text-white rounded py-2 px-5 text-[18px] font-semibold bg-bg_secondary1 shadow-btn_shadow mt-3">About us</Link>
        </div>
        {showModal && <AddRecipeModal setShowModal = {setShowModal}/>}
      </div>
    </div>
  );
};

export default HeroSection;
