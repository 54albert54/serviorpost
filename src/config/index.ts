require("dotenv").config();

export const config = {
  port: process.env.PORT,
  secureKey: process.env.SECURE_KEY,
  mySql: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  mySqlServices: {
    port: process.env.MySqlPORT,
  },
};
