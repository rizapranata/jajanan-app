import dotenv from "dotenv";
dotenv.config();

const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  owner : process.env.NEXT_PUBLIC_OWNER || "Riza Pranata",
  contactEmail : process.env.NEXT_PUBLIC_CONTACT_EMAIL || "rizajuga@gmail.com"
};

export default config;
