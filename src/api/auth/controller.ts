import { auth } from "../../auth";
import { TABLA, TypeAuth } from "../../store/dummy.schema";
import { store as backupStore } from "../../store/dummyDataBase";
import bcrypt from "bcrypt";
export interface TProps {
  userName: string;
  passwords: string;
}
export const controller = (TABLA: TABLA, injectedStored: any) => {
  let store = injectedStored || null;
  if (!store) {
    store = backupStore;
  }

  async function query(userName: string, password: string) {
    const data = await store.query(TABLA, { userName });
    return bcrypt.compare(password, data.passwords).then(isMatch =>{
      if (isMatch === true) {
        //! General TOKEN
        const token = auth.sign(password);
        const{passwords,...showData} = data
        return showData;
      } else {
        throw new Error("incorrect password");
      }
    })
    
  }

  async function upset(data: TypeAuth) {
    const authData:TypeAuth = {
      id: data.id,
      
    };

    if (data.userName) {
      authData.userName = data.userName;
    }

    if (data.passwords) {
      authData.passwords = await bcrypt.hash(data.passwords, 5);
    }
    
    await store.upset(TABLA, authData);
  }

  return { upset, query };
};
