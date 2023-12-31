require("dotenv").config();
module.exports = {
  allowedOrigins: [
    "http://localhost:3000/",
    "https://guileless-gumdrop-7419e1.netlify.app/dashboard",
    "https://guileless-gumdrop-7419e1.netlify.app"
  ],
  SERVER_PORT: process.env.PORT || 3000,
  SERVER_DB_URI: process.env.DB_URL,
  JWT_SECRET: process.env.SECRET,
  OTP_LENGTH: 10,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    
  },
  MAIL_SETTINGS: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  },
};