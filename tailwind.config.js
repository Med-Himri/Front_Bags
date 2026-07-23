module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#414A22',   
          secondary: '#BD9343', 
          accent: '#717C35',    
          light: '#FCFBF8',     
          white: '#FFFFFF',     
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
};