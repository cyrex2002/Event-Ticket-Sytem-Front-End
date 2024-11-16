module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This pattern includes all HTML and TypeScript files in your src folder
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-image': "url('./assests/login.jpeg')",
      }
    },
  },
  plugins: [],
};