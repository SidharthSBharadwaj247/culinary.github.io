/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        btn_shadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
      },
      backgroundColor:{
        bg_secondary1:"#a7462c",
        bg_secondary2:"#FFDF00",
      },
      textColor:{
        secondary1:"#a7462c",
        secondary2:"#FFDF00",
        secondary3:"#BDB76B",
      }
      
    },
  },
  plugins: [],
}