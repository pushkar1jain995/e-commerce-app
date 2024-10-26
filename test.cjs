// test.js
require("dotenv").config({ path: ".env.local" });

// Access the environment variables
const googleClientId = process.env.GOOGLE_ID;
// const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Log the values
console.log("Google Client ID:", googleClientId);
