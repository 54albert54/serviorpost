
export enum TABLA{ 
  USER ='user',
  AUTH ='auth'
}

export interface TypeDataBase {
  user:TypeData[]
  auth?:TypeAuth[]
}

export type TypeData ={
  name:string
  userName?:string
  id:string
  passwords:string
}
export type TypeAuth ={
  name?:string
  id:string
  passwords?:string
  userName?:string
}
export interface AllTypeDataBase{
  db:TypeDataBase
  list:(table:TABLA)=>{}
  get:(table:TABLA,id:number)=>{}
  upset:(table:TABLA, data:any)=>{}
  remove:()=>{table:string , id:number}
}