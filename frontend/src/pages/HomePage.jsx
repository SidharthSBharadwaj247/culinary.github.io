import React, { useEffect } from "react";
import HeroSection from "../components/homepage/HeroSection";
import RecipesSection from "../components/homepage/RecipesSection";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <div className="px-3">
      <Toaster position="top-center" reverseOrder={false} />
      <HeroSection />
      <RecipesSection />
    </div>
  );
};

export default HomePage;
