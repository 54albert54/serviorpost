import jwt from 'jsonwebtoken'
import  { Request, Response,} from 'express';
import { config } from '../config';

const secret = config.secureKey as string 
function sign(data:any){
  return jwt.sign(data , secret)
}
function getToken(auth: string):string {
  if (!auth){
    throw new Error(' Error al no venir token')
  }
  if (auth.indexOf('Bearer ')=== -1){
    throw new Error(' Error token invalido')
  }
  let token = auth.replace('Bearer ', '')
  return token
}

function verify(token: string) {
  return jwt.verify(token , secret)
}


function decodeHeader(req:Request){
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization)
  const decoded = verify(token)
}
const check ={
  own:(req:Request,owner:string)=>{

  },

}


export const auth = {
  sign,check
}


