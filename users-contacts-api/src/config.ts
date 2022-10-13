import dotenv from "dotenv";

dotenv.config();

export default {
  appName: process.env.APP_NAME || "User Contacts",
  appPort: process.env.APP_PORT || 3001,
};
