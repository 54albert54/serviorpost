require("dotenv").config();
console.log('process.env.USER',process.env.DBUSER);

export const config = {
  isDev:process.env.ISDEV,
  port: process.env.PORT,
  secureKey: process.env.SECURE_KEY,
  mySql: {
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  mySqlServices: {
    port: process.env.MySqlPORT,
  },
};
