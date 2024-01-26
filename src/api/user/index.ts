import { TABLA } from "../../store/dummy.schema";
import { store } from "../../store/mySql";

import { controller } from "./controller";




export default ()=> controller(TABLA.USER, store)
