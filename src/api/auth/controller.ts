import { auth } from "../../auth";
import { TABLA, TypeAuth } from "../../store/dummy.schema";
import { store as backupStore } from "../../store/mySql";
import bcrypt from "bcrypt";
export interface TProps {
  userName: string;
  password: string;
}
export const controller = (TABLA: TABLA, injectedStored: any) => {
  let store = injectedStored || null;
  if (!store) {
    store = backupStore;
  }

  async function query(userName: string, password: string) {

    
    const data = await store.query(TABLA, { userName });
      console.log('data',data);
      
    
    return bcrypt.compare(password, data[0].password).then(isMatch =>{
      if (isMatch === true) {
        //! General TOKEN
        const token = auth.sign(data[0]);
        const{password,...showData} = data[0]
        // add token a user went login
       
        return {showData , token};
      } else {
        throw new Error("incorrect password");
      }
   })
    
  }

  async function upset(data: TypeAuth) {
    const authData:TypeAuth = {
      id: data.id,
      
    };
    if (data.name) {
      authData.name = data.name;
    }

    if (data.userName) {
      authData.userName = data.userName;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }
    
    await store.upset(TABLA, authData);
  }
  async function update(data:any){
    store.update(TABLA,data)
  }

  return { upset, query ,update };
};
