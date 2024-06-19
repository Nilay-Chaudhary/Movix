/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newutils = {
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            height : '10px',
          },
          '&::-webkit-scrollbar-track': {
            background : '#04152d',
            borderRadius : '10px'
          },
          '&::-webkit-scrollbar-thumb': {
            "background-color" : '#173d77',
            "border-radius" : '20px'
          }
        },
        '.scrollbar-none':{
          '&::-webkit-scrollbar':{
            display : 'none'
          }
        }
      }
      addUtilities(newutils, ['responsive', 'hover']);
    }
  ],
}
