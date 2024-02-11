import mysql from "mysql2/promise";
import { config } from "../config";
import { TABLA, TDeleteID } from "./dummy.schema";




const connectInfo = {
  host: config.mySql.host,
  user:config.mySql.user,
  database: config.mySql.database,
  password: config.mySql.password,
};


  let instancia:any = null
async function createConnection() {
  if (instancia == null){
    
    
    instancia = await mysql.createConnection(connectInfo);
  }

   return instancia
}


async function list(table: TABLA) {
  const connection = await createConnection()
  
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name , u.userName  FROM ${table} as u `
    );

    dataBase = db as [];
  } catch (err) {
    console.log(err);
  }
  
  return dataBase || ["no hay datos"];
}

// info de user  
async function get(table: TABLA, id: string) {
  const connection = await createConnection()
  let dataBase: any;
  try {
    const [db, fields] = await connection.query(
      `SELECT * FROM ${table} WHERE id = ${id} `
    );
    // results contains rows returned by server
    const getDAta: any = db;
    const { password, ...userData } = getDAta[0];

    //create a list for followers
    userData.followers = await viewFollowers(table, id);
    userData.youFollow = await viewFollow(table, id);
    userData.viewPostLike = await viewPostLike(TABLA.USER, TABLA.POST, id);
    dataBase = userData;
    
  } catch (err) {
    console.log(err);
  }

  return dataBase;
}
//create user
async function insert(table: TABLA, data: any) {
  const connection = await createConnection()
  let dataBase;

  try {
    const [db, fields] = await connection.query(
      `INSERT INTO ${table} SET ? `,
      data
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }

  return dataBase;
}
//update user info
async function upset(table: TABLA, data: any, id: any) {
  return id ? update(table, data, id) : insert(table, data);
}
async function query(table: TABLA, q: any) {
  const key = Object.keys(q)[0];

  const connection = await createConnection()
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT * FROM ${table} WHERE ${key} = '${q[key]}' `
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
 
  return dataBase;
}

async function update(table: TABLA, data: any, id: number) {
  const connection = await createConnection()
  let dataBase;
  try {
    // delete data.id
    const [db, fields] = await connection.query(
      `UPDATE ${table} SET ?  WHERE id = ${id}`,
      data
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function follow(table: TABLA, data: any) {
  const connection = await createConnection()
  let dataBase;
  try {
    // delete data.id
    const [db, fields] = await connection.query(
      `INSERT INTO ${table} SET ? `,
      data
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewFollowers(table: TABLA, id: any) {
  const connection = await createConnection()
  let dataBase: any;

  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${table} AS u INNER JOIN ${table}_follow  as FollowList ON u.id = FollowList.follower_id WHERE  FollowList.follower_id = ${id} `
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewFollow(table: TABLA, id: any) {
  const connection = await createConnection()
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${table} AS u INNER JOIN ${table}_follow  as FollowList ON u.id = FollowList.follower_id WHERE  FollowList.user_id = ${id} `
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewPostLike(tablaUser: TABLA, tablaPost: TABLA, id: string) {
  const connection = await createConnection()
  let dataBase: any;

  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${tablaUser} AS u INNER JOIN ${tablaPost}_like as postList ON u.id = postList.user_id WHERE  u.id = ${id} `
    );
    dataBase = db;

    
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
//* Post
async function listPost(table: TABLA) {
  const connection = await createConnection()
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT ps.id ,ps.title , ps.detail, ps.img  , us.userName as ownerUser FROM ${table} as ps INNER JOIN ${TABLA.USER} as us on ps.owner_id = us.id ORDER BY ps.id DESC`
    );

    dataBase = db as [];
  } catch (err) {
    console.log(err);
  }
  return dataBase ;
}
async function getPost(table: TABLA, id: string) {
  const connection = await createConnection()
  let dataBase: any;
 
  try {
    const [db, fields] = await connection.query(
      `SELECT p.id , p.title ,p.detail , p.img ,u.userName as owner_name FROM ${table} as p INNER JOIN user as u on p.owner_id = u.id  WHERE p.id = ${id} `
    );
    // results contains rows returned by server
    const getDAta: any = db;

    const userData  = getDAta[0];
    //create a list for followers
    userData.userThatLike = await viewUserLiked(table, TABLA.USER, id);
    // userData.youFollow = await viewFollow(table,id)
    dataBase = userData;
  } catch (err) {
    console.log(err);
  }
  
  return dataBase;
}
async function updatePost(table: TABLA, data: any) {
  const connection = await createConnection()
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `UPDATE ${table} SET ?  WHERE id = ${data.idPost} AND owner_id = ${data.user}`,
      data.data
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewUserLiked(table: TABLA, userTabla: TABLA, id: any) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase: any;

  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${userTabla} AS u INNER JOIN ${table}_like as LikeList ON u.id = LikeList.user_id WHERE  LikeList.post_id = ${id} `
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}


async function deletePost(table: TABLA, data:TDeleteID) {

  const connection = await createConnection()
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `DELETE FROM ${table} as P WHERE p.id = ${data.postID} AND p.owner_id = ${data.userID};`,
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}


export const store = {
  list,
  get,
  upset,
  follow,
  update,
  query,
  listPost,
  getPost,
  updatePost,
  deletePost
};
