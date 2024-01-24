import { TABLA } from "../../store/dummy.schema";
import { controller } from "./controller";





export default (store:any)=> controller(TABLA.AUTH, store)