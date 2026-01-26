/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    // Keep Vite files for now (panel/admin)
    "./index.html",
    "./index.tsx",
    "./App.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

