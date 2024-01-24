
import { TABLA, TypeData } from "../../store/dummy.schema";
import { store as backupStore } from "../../store/dummyDataBase";
import { v4 as uuidv4 } from 'uuid';
import authController from '../auth'
export const controller = (TABLA:TABLA, injectedStored: any) => {
  let store = injectedStored || null;
  if (!store) {
    store = backupStore;
  }
  async function list() {
    return await store.list(TABLA);
  }
  async function get(name: string) {
    return await store.get(TABLA, name);
  }
  async function upset(data: TypeData) {
    data.id = uuidv4()
    authController(store).upset({
      name:data.name,
      id:data.id,
      userName:data.userName,
      passwords:data.passwords,
    })
    const {passwords , ...dataUser} =  data
    // delete  data.passwords 
    await store.upset(TABLA, dataUser);
  }
  async function remove(id: string) {
    await store.remove(TABLA, id);
  }

  return { list, get, upset, remove };
};
