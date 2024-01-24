import  { Request, Response,} from 'express';
import { auth } from '../../auth';
export  const checkAuth = (action:any)=>{
  
  const middleware = (req:Request , res:Response, next :any)=>{
      switch (action) {
        case 'update':
          const owner = req.body.id
          auth.check.own(req,owner)
          
          break;
      
        default:
          next()
          break;
      }
  }
  
  return middleware;
}