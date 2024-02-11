require("dotenv").config();

const isDev = process.env.ISDEV === 'true'

console.log('isDev ',isDev);

export const config = {
  isDev:process.env.ISDEV, 
  port: process.env.PORT,
  secureKey: process.env.SECURE_KEY,
  mySql: {
    host:isDev?process.env.LOCAL_HOST: process.env.HOST ,
    user:isDev?process.env.LOCAL_USER: process.env.DBUSER,
    password:isDev?process.env.LOCAL_PASSWORD: process.env.PASSWORD,
    database:isDev?process.env.LOCAL_DATABASE: process.env.DATABASE,
  },
  mySqlServices: {
    port: process.env.MySqlPORT,
  },
};
