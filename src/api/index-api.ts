import express from "express";
import path = require("path");
import routerApi from "../router";
import bodyParser from "body-parser";
import { config } from "../config";
import errorResponse from "../network/error";
import otherWay from "../store/remote";

const app = express();
const port = config.port || 3000;

app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, "index.html"));

});
app.get('/qw',(req,res)=>{
  res.json({msg:'hola'})
})


//Routers

routerApi(app);


// otherWay("get", "http://localhost", 3001);

//las for error response
app.use(errorResponse);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
