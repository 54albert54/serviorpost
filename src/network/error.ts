import { estatusError } from "./response";



export default (err:any,req:any,res:any ,next:any)=>{
    
  const message = err.message || 'Error interno';
  const status = err.statusCode || 500;

    estatusError({req,res,message:message ,status})
}

