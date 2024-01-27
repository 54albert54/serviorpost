import express from "express";
import path = require("path");
import routerApi from "../router";
// import swaggerUi  from 'swagger-ui-express'
import bodyParser from "body-parser";
import { config } from "../config";
import errorResponse from "../network/error";
import otherWay from "../store/remote";



const app = express();
const port = config.port ||  3000;

app.use(bodyParser.json()); // Para manejar solicitudes con formato JSON
// app.use(bodyParser.urlencoded({ extended: true })); // Para manejar solicitudes con formato de formulario

app.use(express.static("public"));
app.get("/", (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, "index.html"));
  //res.send('esto es desde mi archivo index');
});


//Routers

routerApi(app);

//connect()
otherWay('get','http://localhost',3001 )
//las for error response
app.use(errorResponse);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
