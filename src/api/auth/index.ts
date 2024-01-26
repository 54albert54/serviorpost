import { TABLA } from "../../store/dummy.schema";
import { controller } from "./controller";
import { store } from "../../store/mySql";





export default ()=> controller(TABLA.AUTH, store)