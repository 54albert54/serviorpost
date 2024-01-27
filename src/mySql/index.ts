import  express  from "express";
import bodyParser from "body-parser";

import { config } from "../config";
import routeMySqlServices from "./network";

const app = express()
app.use(bodyParser.json())

app.use(routeMySqlServices)

app.listen(config.mySqlServices.port,()=>{
  console.log('Remote MicroServices MySql',config.mySqlServices.port);
  
})