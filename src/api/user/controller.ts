import { TABLA, TypeData } from "../../store/dummy.schema";
import { store as backupStore } from "../../store/dummyDataBase";
import bcrypt from "bcrypt";
import authController from "../auth";
export const controller = (TABLA: TABLA, injectedStored: any) => {
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
    authController().upset({
      name: data.name,
      id: data.id,
      userName: data.userName,
      password: data.password,
    });
    data.password = await bcrypt.hash(data.password, 5);
    const { password, ...dataUser } = data;

    await store.upset(TABLA, data);
    return dataUser;
  }
  async function remove(id: string) {
    await store.remove(TABLA, id);
  }
  async function update(body: any) {
    //actualizar auth
    authController()
      .update(body)
      .then((info) => console.log(info));
    await store.update(TABLA, body);
  }
  async function follow(from:string, to:string) {
    store.follow(TABLA+'_follow',{
      user_id:from,
      follower_id:to
    })
  }

  return { list, get, upset, remove, update,follow };
};
