import express, { Request, Response } from "express";
import { estatusSuccess, estatusError } from "../network/response";
import { store } from "../store/mySql";
import { TABLA } from "../store/dummy.schema";
import AuthServices from "../api/auth/index";
import { decodeHeader } from "../auth";


const routeMySqlServices = express.Router()


routeMySqlServices.get('/:table', list)
routeMySqlServices.get('/:table/:id', get)
routeMySqlServices.post('/:table', insert)
routeMySqlServices.put('/:table/:id', upsert)
//  routeMySqlServices.post('/auth/login', login)



async function list(req:Request, res:Response, next:any) {
 
  const datos =  await store.list(req.params.table as TABLA)
  estatusSuccess({res,req ,message:datos})
  
}
async function get(req:Request, res:Response, next:any) {
  const datos =  await store.get(req.params.table as TABLA , req.params.id)
  estatusSuccess({res,req ,message:datos})
}
async function insert(req:Request, res:Response, next:any) {
  const decoded = decodeHeader(req)
  
  const datos =  await store.upset(req.params.table as TABLA , req.body, req.params.id)
  
  estatusSuccess({res,req ,message:datos})
}
async function upsert(req:Request, res:Response, next:any) {
  const datos =  await store.upset(req.params.table as TABLA , req.body, req.params.id)
  
  estatusSuccess({res,req ,message:datos})
}

async function login(req:Request, res:Response, next:any) {
  const { userName , password} = req.body;
   const datos =  await AuthServices().query( userName , password)
   
    
   estatusSuccess({res,req ,message:datos})
}

export default routeMySqlServices
