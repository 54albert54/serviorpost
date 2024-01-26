import  { Request, Response,} from 'express';
import { auth } from '../../auth';
import { ACTIONS } from '../../store/dummy.schema';
export  const checkAuth = (action:ACTIONS)=>{
  // follow
  const middleware = (req:Request , res:Response, next :any)=>{
      switch (action) {
        case 'update':
          const owner = req.body.id          
          auth.check.own(req,owner)
          next()
          break;
          case 'follow':
          return auth.check.follow(req) , next()
         
          
          break;
      
        default:
          next()
          break;
      }
  }
  
  return middleware;
}