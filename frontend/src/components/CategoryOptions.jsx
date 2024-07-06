import React from "react";

const CategoryOptions = ({options,dataInp}) => {
  return (
    <select
      name="category"
      onChange={dataInp}
      className=" px-2 py-4 rounded border md:text-[18px] text-[14px] w-full border-black"
    >
      <option value="Category" selected disabled hidden>
        Category
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default CategoryOptions;
