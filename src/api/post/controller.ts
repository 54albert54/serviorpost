import { TABLA, TypePost } from "../../store/dummy.schema";
import { store as backupStore } from "../../store/dummyDataBase";

export const controller = (TABLA: TABLA, injectedStored: any) => {
  let store = injectedStored || null;
  if (!store) {
    store = backupStore;
  }
  async function list() {
    return await store.list(TABLA);
  }
  async function get(id: string) {
    return await store.getPost(TABLA, id);
  }
  async function upset(post: TypePost) {
    await store.upset(TABLA, post);
  }
  async function remove(id: string) {
    // await store.remove(TABLA, id);
  }
  async function updatePost(data: any ,idPost:string ,user:number) {
    await store.updatePost(TABLA ,{data , idPost ,user})
  
  }
  async function follow(from:string, to:string) {
    await store.follow(TABLA+'_like',{
      user_id:from,
      post_id:to
    })
  }

  async function deleted(postID:string , userID:string) {
    const dbRes = await store.deletePost(TABLA,{postID,userID})
    console.log('dbRes',dbRes);
    
  }

  return { list, upset , get ,updatePost , follow,deleted
    };
};