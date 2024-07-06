import React from "react";

const DropDown = ({setCat,setDropDown}) => {
    const Categories = ["All Recipes","Veg", "Non-Veg", "Italian", "Indian"];
  return (
    <div className="absolute right-0 top-12 font-normal text-[15px] max-w-[150px] w-5/12 bg-white z-[3]">
      {Categories.map((category, idx) => (
        <p
          className="border py-1 px-1 hover:bg-slate-300 cursor-pointer"
          key={idx}
          onClick={() => {
            setCat(category);
            setDropDown(false);
          }}
        >
          {category}
        </p>
      ))}
    </div>
  );
};

export default DropDown;
